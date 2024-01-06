import api from "../../utils/api";

import { StartLoadingActions, FetchLoadingActions, FinishLoadingActions } from '../loading/action'
import { ShowSuccess, ShowError } from '../error/middleware'

import { GetPartnersActions } from "./action";

function GetPartners(version) {
    return async dispatch => {
        dispatch(StartLoadingActions())
        try {
            dispatch(FetchLoadingActions())
            const sponsor = await api.Get_Sponsor_List(version);
            const medpart = await api.Get_Medpart_List(version);

            dispatch(GetPartnersActions(medpart.data.partners, sponsor.data.partners));
        } catch (err) {
            dispatch(GetPartnersActions([], []));
        }
        dispatch(FinishLoadingActions())
    }
}

function AddPartner(payload) {
    return async dispatch => {
        dispatch(StartLoadingActions())
        try {
            dispatch(FetchLoadingActions())
            const response = await api.Add_Partner(payload);

            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetPartners(payload.version))
            ShowSuccess('Success Add New Partner')
        } catch (err) {
            ShowError('Failed Add New Partner')
        }
        dispatch(FinishLoadingActions())
    }
}

function EditPartner(payload) {
    return async dispatch => {
        dispatch(StartLoadingActions())
        try {
            dispatch(FetchLoadingActions())
            const response = await api.Update_Partner(payload);

            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetPartners(payload.version))
            ShowSuccess('Success Edit Partner')
        } catch (err) {
            ShowError('Failed Edit Partner')
        }
        dispatch(FinishLoadingActions())
    }
}

function DeletePartner(id, version) {
    return async dispatch => {
        dispatch(StartLoadingActions())
        try {
            dispatch(FetchLoadingActions())
            const response = await api.Delete_Partner(id);
            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetPartners(version))
            ShowSuccess('Success Delete Partner')
        } catch (err) {
            ShowError('Failed Delete Partner')
        }
        dispatch(FinishLoadingActions())
    }
}

export { GetPartners, AddPartner, EditPartner, DeletePartner }