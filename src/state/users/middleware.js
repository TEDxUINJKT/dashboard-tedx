import api from "../../utils/api";

import { GetUsersActions } from "./action";

function GetUsers() {
    return async dispatch => {
        try {
            const response = await api.Get_User_List();
            console.log()
            dispatch(GetUsersActions(response.data.data));
        } catch (err) {
            console.error(err);
            dispatch(GetUsersActions([]));
        }
    }
}

function AddUser(payload) {
    return async dispatch => {
        try {
            const response = await api.Register_User(payload);

            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetUsers())

        } catch (err) {
            console.error(err);
        }
    }
}

function EditUser(payload) {
    return async dispatch => {
        try {
            const response = await api.Update_User(payload);

            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetUsers())

        } catch (err) {
            console.error(err);
            console.log('erorr')
        }
    }
}

function DeleteUser(id) {
    return async dispatch => {
        try {
            const response = await api.Delete_User(id);
            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetUsers())
        } catch (err) {
            console.error(err);
        }
    }
}

export { GetUsers, AddUser, EditUser, DeleteUser }