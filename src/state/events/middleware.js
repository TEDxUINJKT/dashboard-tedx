import api from "../../utils/api";

import { GetEventsActions } from "./action";

function GetEvents(version) {
    return async dispatch => {
        try {
            const response = await api.Get_Event_List(version);
            dispatch(GetEventsActions(response.data.events));
        } catch (err) {
            console.error(err);
            dispatch(GetEventsActions([]));
        }
    }
}

function AddEvent(payload) {
    return async dispatch => {
        try {
            const response = await api.Add_Event(payload);

            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetEvents(payload.version))

        } catch (err) {
            console.error(err);
        }
    }
}

function EditEvent(payload) {
    return async dispatch => {
        try {
            const response = await api.Update_Event(payload);

            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetEvents(payload.version))

        } catch (err) {
            console.error(err);
        }
    }
}

function DeleteEvent(id, version) {
    return async dispatch => {
        try {
            const response = await api.Delete_Event(id);
            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetEvents(version))
        } catch (err) {
            console.error(err);
        }
    }
}

export { GetEvents, AddEvent, EditEvent, DeleteEvent }