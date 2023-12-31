import api from "../../utils/api";

import { GetTicketsActions } from "./action";

function GetTickets() {
    return async dispatch => {
        try {
            const response = await api.Get_Ticket_List();
            dispatch(GetTicketsActions(response.data.tickets));
        } catch (err) {
            console.error(err);
            dispatch(GetTicketsActions([]));
        }
    }
}

function AddTicket(payload) {
    return async dispatch => {
        try {
            const response = await api.Add_Ticket(payload);

            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetTickets())

        } catch (err) {
            console.error(err);
        }
    }
}

function EditTicket(payload) {
    return async dispatch => {
        try {
            const response = await api.Update_Ticket(payload);

            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetTickets())

        } catch (err) {
            console.error(err);
            console.log('erorr')
        }
    }
}

function DeleteTicket(id) {
    return async dispatch => {
        try {
            const response = await api.Delete_Ticket(id);
            if (response.info !== undefined) {
                throw new Error()
            }
            dispatch(GetTickets())
        } catch (err) {
            console.error(err);
        }
    }
}

export { GetTickets, AddTicket, EditTicket, DeleteTicket }