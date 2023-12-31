import { ActionType } from "./action"

export default function EventsReducer(events = [], action = {}) {
    switch (action.type) {
        case ActionType.GET_EVENT:
            return events = action.payload.events
        default:
            return events;
    }
}