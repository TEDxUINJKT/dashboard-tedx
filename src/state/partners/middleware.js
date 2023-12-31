import api from "../../utils/api";

import { GetPartnersActions } from "./action";

function GetPartners(version) {
    return async dispatch => {
        try {
            const sponsor = await api.Get_Sponsor_List(version);
            const medpart = await api.Get_Medpart_List(version);

            dispatch(GetPartnersActions(medpart.data.partners, sponsor.data.partners));
        } catch (err) {
            console.error(err);
            dispatch(GetPartnersActions([], []));
        }
    }
}

function AddPartner(payload) {
    return async dispatch => {
        try {
            const response = await api.Add_Partner(payload);

            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetPartners(payload.version))

        } catch (err) {
            console.error(err);
        }
    }
}

function EditPartner(payload) {
    return async dispatch => {
        try {
            const response = await api.Update_Partner(payload);

            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetPartners(payload.version))

        } catch (err) {
            console.error(err);
            console.log('erorr')
        }
    }
}

function DeletePartner(id, version) {
    return async dispatch => {
        try {
            const response = await api.Delete_Partner(id);
            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetPartners(version))
        } catch (err) {
            console.error(err);
        }
    }
}

export { GetPartners, AddPartner, EditPartner, DeletePartner }