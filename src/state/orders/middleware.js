import api from "../../utils/api";

import { StartLoadingActions, FetchLoadingActions, FinishLoadingActions } from '../loading/action'
import { ShowSuccess, ShowError } from '../error/middleware'

import { GetOrderListActions } from "./action";

function GetOrders(event_id) {
    return async dispatch => {
        dispatch(StartLoadingActions())
        try {
            dispatch(FetchLoadingActions())
            const response = await api.Get_Order_List(event_id);
            dispatch(GetOrderListActions(response.data.data));
        } catch (err) {
            dispatch(GetOrderListActions([]));
        }
        dispatch(FinishLoadingActions())
    }
}

function AddOrder(payload) {
    return async dispatch => {
        dispatch(StartLoadingActions())
        try {
            dispatch(FetchLoadingActions())
            const response = await api.Add_Order(payload);

            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetOrders())
            ShowSuccess('Success Add New Order')
        } catch (err) {
            ShowError('Failed Add Order')
        }
        dispatch(FinishLoadingActions())
    }
}

function EditOrder(payload) {
    return async dispatch => {
        dispatch(StartLoadingActions())
        try {
            dispatch(FetchLoadingActions())
            const response = await api.Update_Order(payload);

            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetOrders(payload.event_id))
            ShowSuccess('Success Edit Order')
        } catch (err) {
            ShowError('Failed Edit Order')
        }
        dispatch(FinishLoadingActions())
    }
}

function CheckOrder(id) {
    return async dispatch => {
        dispatch(StartLoadingActions())
        try {
            dispatch(FetchLoadingActions())
            const response = await api.Check_Order(id);

            if (response.info !== undefined) {
                throw new Error()
            }

            if (response.status === 200) {
                ShowSuccess('Order Valid')
                return response.data.data;
            }

            ShowError(response.info);
        } catch (err) {
            ShowError('Order Not Valid')
        }
        dispatch(FinishLoadingActions())
    }
}

function GuestAttend(id) {
    return async dispatch => {
        dispatch(StartLoadingActions())
        try {
            dispatch(FetchLoadingActions())
            const response = await api.Guest_Attend(id);

            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetOrders())
            ShowSuccess('User check in success')
        } catch (err) {
            ShowError('Failed to check in user')
        }
        dispatch(FinishLoadingActions())
    }
}

function DeleteOrder(id) {
    return async dispatch => {
        dispatch(StartLoadingActions())
        try {
            dispatch(FetchLoadingActions())
            const response = await api.Delete_Order(id);
            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetOrders())
            ShowSuccess('Success Delete Order')
        } catch (err) {
            ShowError('Failed Delete Order')
        }
        dispatch(FinishLoadingActions())
    }
}

function FilterOrder(event, value, id, filterFunction) {
    return async dispatch => {
        dispatch(StartLoadingActions());

        if(value === '') {
            dispatch(GetOrders(id));
            return;
        }

        const filteredEvent = event.filter(item => filterFunction(item, value));

        dispatch(GetOrderListActions(filteredEvent));
        dispatch(FinishLoadingActions());
    };
}

export { FilterOrder, GetOrders, AddOrder, EditOrder, CheckOrder, GuestAttend, DeleteOrder }