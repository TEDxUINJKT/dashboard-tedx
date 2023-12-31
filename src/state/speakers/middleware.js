import api from "../../utils/api";

import { GetSpeakersActions } from "./action";

function GetSpeakers(version) {
    return async dispatch => {
        try {
            const main = await api.Get_Main_Speaker_List(version);
            const student = await api.Get_Student_Speaker_List(version);

            dispatch(GetSpeakersActions(main.data.speaker, student.data.speaker));
        } catch (err) {
            console.error(err);
            dispatch(GetSpeakersActions([], []));
        }
    }
}

function AddSpeaker(payload) {
    return async dispatch => {
        try {
            const response = await api.Add_Speaker(payload);

            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetSpeakers(payload.version))

        } catch (err) {
            console.error(err);
        }
    }
}

function EditSpeaker(payload) {
    return async dispatch => {
        try {
            const response = await api.Update_Speaker(payload);

            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetSpeakers(payload.version))

        } catch (err) {
            console.error(err);
            console.log('erorr')
        }
    }
}

function DeleteSpeaker(id, version) {
    return async dispatch => {
        try {
            const response = await api.Delete_Speaker(id);
            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetSpeakers(version))
        } catch (err) {
            console.error(err);
        }
    }
}

export { GetSpeakers, AddSpeaker, EditSpeaker, DeleteSpeaker }