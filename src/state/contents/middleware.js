import api from "../../utils/api";

import { GetContentsActions } from "./action";

function GetContents(version) {
    return async dispatch => {
        try {
            const response = await api.Get_Content_Version(version);
            dispatch(GetContentsActions(response.data.contents));
        } catch (err) {
            console.error(err);
            dispatch(GetContentsActions([]));
        }
    }
}

function AddContent(payload) {
    return async dispatch => {
        try {
            const response = await api.Add_Content(payload);

            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetContents(payload.version))

        } catch (err) {
            console.error(err);
        }
    }
}

function EditContent(payload) {
    return async dispatch => {
        try {
            const response = await api.Update_Content(payload);

            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetContents(payload.version))

        } catch (err) {
            console.error(err);
            console.log('erorr')
        }
    }
}

function DeleteContent(id, version) {
    return async dispatch => {
        try {
            const response = await api.Delete_Content(id);
            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetContents(version))
        } catch (err) {
            console.error(err);
        }
    }
}

export { GetContents, AddContent, EditContent, DeleteContent }