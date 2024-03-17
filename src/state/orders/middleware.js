import api from "../../utils/api";

import {
  StartLoadingActions,
  FetchLoadingActions,
  FinishLoadingActions,
} from "../loading/action";
import { ShowSuccess, ShowError } from "../error/middleware";

import { GetOrderListActions } from "./action";

function GetOrders(event_id) {
  return async (dispatch) => {
    dispatch(StartLoadingActions());
    try {
      dispatch(FetchLoadingActions());
      const response = await api.Get_Order_List(event_id);
      dispatch(GetOrderListActions(response.data.data));
    } catch (err) {
      dispatch(GetOrderListActions([]));
    }
    dispatch(FinishLoadingActions());
  };
}

function AddOrder(payload) {
  return async (dispatch) => {
    dispatch(StartLoadingActions());
    try {
      dispatch(FetchLoadingActions());
      const response = await api.Add_Order(payload);

      if (response.info !== undefined) {
        throw new Error();
      }
      ShowSuccess("Success Add New Order");
    } catch (err) {
      ShowError(err.response.data.info);
    }
    dispatch(GetOrders(payload.event_id));
    dispatch(FinishLoadingActions());
  };
}

function EditOrder(payload) {
  return async (dispatch) => {
    dispatch(StartLoadingActions());
    try {
      dispatch(FetchLoadingActions());
      const response = await api.Update_Order(payload);

      if (response.info !== undefined) {
        throw new Error();
      }
      ShowSuccess("Success Edit Order");
    } catch (err) {
      ShowError(err.response.data.info);
    }
    dispatch(GetOrders(payload.event_id));
    dispatch(FinishLoadingActions());
  };
}

function CheckOrder(id) {
  return async (dispatch) => {
    dispatch(StartLoadingActions());
    try {
      dispatch(FetchLoadingActions());
      const response = await api.Check_Order(id);
      ShowSuccess("Order Valid");
      return response.data;
    } catch (err) {
      ShowError(err.response.data.info);
    }
    dispatch(FinishLoadingActions());
  };
}

function GuestAttend(id) {
  return async (dispatch) => {
    dispatch(StartLoadingActions());
    try {
      dispatch(FetchLoadingActions());
      const response = await api.Guest_Attend(id);

      if (response.info !== undefined) {
        throw new Error();
      }
      dispatch(GetOrders());
      ShowSuccess("User check in success");
    } catch (err) {
      ShowError("Failed to check in user");
    }
    dispatch(FinishLoadingActions());
  };
}

function DeleteOrder(id, event_id) {
  return async (dispatch) => {
    dispatch(StartLoadingActions());
    try {
      dispatch(FetchLoadingActions());
      const response = await api.Delete_Order(id);
      if (response.info !== undefined) {
        throw new Error();
      }
      ShowSuccess("Success Delete Order");
    } catch (err) {
        ShowError(err.response.data.info);
    }
    dispatch(FinishLoadingActions());
    dispatch(GetOrders(event_id));
  };
}

function FilterOrder(event, value, id, filterFunction) {
  return async (dispatch) => {
    dispatch(StartLoadingActions());

    if (value === "") {
      dispatch(GetOrders(id));
      return;
    }

    const filteredEvent = event.filter((item) => filterFunction(item, value));

    dispatch(GetOrderListActions(filteredEvent));
    dispatch(FinishLoadingActions());
  };
}

export {
  FilterOrder,
  GetOrders,
  AddOrder,
  EditOrder,
  CheckOrder,
  GuestAttend,
  DeleteOrder,
};
