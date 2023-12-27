import { ActionType } from "./action";

export default function ErrorReducer(error = { status: false }, action = {}) {
    switch (action.type) {
        case ActionType.IS_ERROR:
            return error = action.payload
        case ActionType.ISNT_ERROR:
            return error = { status: false }
        default:
            return error;
    }
}