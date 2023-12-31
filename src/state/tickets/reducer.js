import { ActionType } from "./action"

export default function TicketsReducer(tickets = [], action = {}) {
    switch (action.type) {
        case ActionType.GET_TICKETS:
            return tickets = action.payload.tickets
        default:
            return tickets;
    }
}