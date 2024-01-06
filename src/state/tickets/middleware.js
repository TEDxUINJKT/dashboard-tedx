import api from "../../utils/api";

import { StartLoadingActions, FetchLoadingActions, FinishLoadingActions } from '../loading/action'
import { ShowSuccess, ShowError } from '../error/middleware'

import { GetTicketsActions } from "./action";

function GetTickets(id) {
    return async dispatch => {
        dispatch(StartLoadingActions())
        try {
            dispatch(FetchLoadingActions())
            const response = await api.Get_Ticket_List(id);
            dispatch(GetTicketsActions(response.data.tickets));
        } catch (err) {
            dispatch(GetTicketsActions([]));
        }
        dispatch(FinishLoadingActions())
    }
}

function AddTicket(payload, event_id) {
    return async dispatch => {
        dispatch(StartLoadingActions())
        try {
            dispatch(FetchLoadingActions())
            const response = await api.Add_Ticket(payload, event_id);

            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetTickets(event_id))
            ShowSuccess('Success Add New Ticket')
        } catch (err) {
            ShowError('Failed Add New Ticket')
        }
        dispatch(FinishLoadingActions())
    }
}

function EditTicket(payload, event_id) {
    return async dispatch => {
        dispatch(StartLoadingActions())
        try {
            dispatch(FetchLoadingActions())
            const response = await api.Update_Ticket(payload);

            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetTickets(event_id))
            ShowSuccess('Success Edit Ticket')
        } catch (err) {
            ShowError('Failed Edit Ticket')
        }
        dispatch(FinishLoadingActions())
    }
}

function DeleteTicket(id, event_id) {
    return async dispatch => {
        dispatch(StartLoadingActions())
        try {
            dispatch(FetchLoadingActions())
            const response = await api.Delete_Ticket(id);
            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetTickets(event_id))
            ShowSuccess('Success Delete Ticket')
        } catch (err) {
            ShowError('Failed Delete Ticket')
        }
        dispatch(FinishLoadingActions())
    }
}

export { GetTickets, AddTicket, EditTicket, DeleteTicket }