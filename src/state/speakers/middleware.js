import api from "../../utils/api";

import { StartLoadingActions, FetchLoadingActions, FinishLoadingActions } from '../loading/action'
import { ShowSuccess, ShowError } from '../error/middleware'

import { GetSpeakersActions } from "./action";

function GetSpeakers(version) {
    return async dispatch => {
        dispatch(StartLoadingActions())
        try {
            dispatch(FetchLoadingActions())
            const main = await api.Get_Main_Speaker_List(version);
            const student = await api.Get_Student_Speaker_List(version);

            dispatch(GetSpeakersActions(main.data.speaker, student.data.speaker));
        } catch (err) {
            dispatch(GetSpeakersActions([], []));
        }
        dispatch(FinishLoadingActions())
    }
}

function AddSpeaker(payload) {
    return async dispatch => {
        dispatch(StartLoadingActions())
        try {
            dispatch(FetchLoadingActions())
            const response = await api.Add_Speaker(payload);

            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetSpeakers(payload.version))
            ShowSuccess('Success Add New Speaker')
        } catch (err) {
            ShowError('Failed Add New Speaker')
        }
        dispatch(FinishLoadingActions())
    }
}

function EditSpeaker(payload) {
    return async dispatch => {
        dispatch(StartLoadingActions())
        try {
            dispatch(FetchLoadingActions())
            const response = await api.Update_Speaker(payload);

            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetSpeakers(payload.version))
            ShowSuccess('Success Edit Speaker')
        } catch (err) {
            ShowError('Failed Edit Speaker')
        }
        dispatch(FinishLoadingActions())
    }
}

function DeleteSpeaker(id, version) {
    return async dispatch => {
        dispatch(StartLoadingActions())
        try {
            dispatch(FetchLoadingActions())
            const response = await api.Delete_Speaker(id);
            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetSpeakers(version))
            ShowSuccess('Success Delete Speaker')
        } catch (err) {
            ShowError('Failed Delete Speaker')
        }
        dispatch(FinishLoadingActions())
    }
}

export { GetSpeakers, AddSpeaker, EditSpeaker, DeleteSpeaker }