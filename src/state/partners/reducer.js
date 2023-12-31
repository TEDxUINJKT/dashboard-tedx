import { ActionType } from "./action"

export default function UsersReducer(partners = { medpart: [], sponsor: [] }, action = {}) {
    switch (action.type) {
        case ActionType.GET_PARTNERS:
            return partners = action.payload.partners
        default:
            return partners;
    }
}