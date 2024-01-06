import api from "../../utils/api";

import { StartLoadingActions, FetchLoadingActions, FinishLoadingActions } from '../loading/action'
import { ShowSuccess, ShowError } from '../error/middleware'

import { GetContentsActions } from "./action";

function GetContents(version) {
    return async dispatch => {
        dispatch(StartLoadingActions())
        try {
            dispatch(FetchLoadingActions())
            const response = await api.Get_Content_Version(version);
            dispatch(GetContentsActions(response.data.contents));
        } catch (err) {
            dispatch(GetContentsActions([]));
        }
        dispatch(FinishLoadingActions())
    }
}

function AddContent(payload) {
    return async dispatch => {
        dispatch(StartLoadingActions())
        try {
            dispatch(FetchLoadingActions())
            const response = await api.Add_Content(payload);

            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetContents(payload.version))
            ShowSuccess('Success Add New Content')
        } catch (err) {
            ShowError('Failed Add New Content')
        }
        dispatch(FinishLoadingActions())
    }
}

function EditContent(payload) {
    return async dispatch => {
        dispatch(StartLoadingActions())
        try {
            dispatch(FetchLoadingActions())
            const response = await api.Update_Content(payload);

            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetContents(payload.version))
            ShowSuccess('Success Edit Content')
        } catch (err) {
            ShowError('Failed Edit Content')
        }
        dispatch(FinishLoadingActions())
    }
}

function DeleteContent(id, version) {
    return async dispatch => {
        dispatch(StartLoadingActions())
        try {
            dispatch(FetchLoadingActions())
            const response = await api.Delete_Content(id);
            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetContents(version))
            ShowSuccess('Success Delete Content')
        } catch (err) {
            ShowError('Failed Delete Content')
        }
        dispatch(FinishLoadingActions())
    }
}

export { GetContents, AddContent, EditContent, DeleteContent }