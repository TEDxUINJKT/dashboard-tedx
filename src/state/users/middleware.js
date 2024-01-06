import api from "../../utils/api";

import { StartLoadingActions, FetchLoadingActions, FinishLoadingActions } from '../loading/action'
import { ShowSuccess, ShowError } from '../error/middleware'

import { GetUsersActions } from "./action";

function GetUsers() {
    return async dispatch => {
        dispatch(StartLoadingActions())
        try {
            dispatch(FetchLoadingActions())
            const response = await api.Get_User_List();
            dispatch(GetUsersActions(response.data.data));
        } catch (err) {
            dispatch(GetUsersActions([]));
        }
        dispatch(FinishLoadingActions())
    }
}

function AddUser(payload) {
    return async dispatch => {
        dispatch(StartLoadingActions())
        try {
            dispatch(FetchLoadingActions())
            const response = await api.Register_User(payload);

            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetUsers())
            ShowSuccess('Success Add New User Access')
        } catch (err) {
            ShowError('Failed Add User Access')
        }
        dispatch(FinishLoadingActions())
    }
}

function EditUser(payload) {
    return async dispatch => {
        dispatch(StartLoadingActions())
        try {
            dispatch(FetchLoadingActions())
            const response = await api.Update_User(payload);

            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetUsers())
            ShowSuccess('Success Edit User Access')
        } catch (err) {
            ShowError('Failed Edit User Access')
        }
        dispatch(FinishLoadingActions())
    }
}

function DeleteUser(id) {
    return async dispatch => {
        dispatch(StartLoadingActions())
        try {
            dispatch(FetchLoadingActions())
            const response = await api.Delete_User(id);
            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetUsers())
            ShowSuccess('Success Delete User Access')
        } catch (err) {
            ShowError('Failed Delete User Access')
        }
        dispatch(FinishLoadingActions())
    }
}

export { GetUsers, AddUser, EditUser, DeleteUser }