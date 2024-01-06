import { ActionType } from "./action"

export default function LoadingReducer(loading = 0, action = {}) {
    switch (action.type) {
        case ActionType.START_LOADING:
            return loading = 30
        case ActionType.FETCH_LOADING:
            return loading = 60
        case ActionType.FINISH_LOADING:
            return loading = 100
        case ActionType.RESET_LOADING:
            return loading = 0
        default:
            return loading;
    }
}