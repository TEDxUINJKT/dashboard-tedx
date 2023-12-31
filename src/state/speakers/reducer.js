import { ActionType } from "./action"

export default function UsersReducer(speakers = { main: [], student: [] }, action = {}) {
    switch (action.type) {
        case ActionType.GET_SPEAKERS:
            return speakers = action.payload.speakers
        default:
            return speakers;
    }
}