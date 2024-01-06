import api from "../../utils/api";

import { StartLoadingActions, FetchLoadingActions, FinishLoadingActions } from '../loading/action'
import { ShowSuccess, ShowError } from '../error/middleware'

import { GetEventsActions } from "./action";

function GetEvents(version) {
    return async dispatch => {
        dispatch(StartLoadingActions())
        try {
            dispatch(FetchLoadingActions())
            const response = await api.Get_Event_List(version);
            dispatch(GetEventsActions(response.data.events));
        } catch (err) {
            dispatch(GetEventsActions([]));
        }
        dispatch(FinishLoadingActions())
    }
}

function AddEvent(payload) {
    return async dispatch => {
        dispatch(StartLoadingActions())
        try {
            dispatch(FetchLoadingActions())
            const response = await api.Add_Event(payload);

            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetEvents(payload.version))
            ShowSuccess('Success Add New Event')
        } catch (err) {
            ShowError('Failed Add New Event')
        }
        dispatch(FinishLoadingActions())
    }
}

function EditEvent(payload) {
    return async dispatch => {
        dispatch(StartLoadingActions())
        try {
            dispatch(FetchLoadingActions())
            const response = await api.Update_Event(payload);

            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetEvents(payload.version))
            ShowSuccess('Success Edit Event')
        } catch (err) {
            ShowError('Failed Edit Event')
        }
        dispatch(FinishLoadingActions())
    }
}

function DeleteEvent(id, version) {
    return async dispatch => {
        dispatch(StartLoadingActions())
        try {
            dispatch(FetchLoadingActions())
            const response = await api.Delete_Event(id);
            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetEvents(version))
            ShowSuccess('Success Delete Event')
        } catch (err) {
            ShowError('Failed Delete Event')
        }
        dispatch(FinishLoadingActions())
    }
}

export { GetEvents, AddEvent, EditEvent, DeleteEvent }