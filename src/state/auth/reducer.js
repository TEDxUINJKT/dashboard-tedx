import { ActionType } from "./action"

export default function AuhtReducer(auth = {}, action = {}) {
    switch (action.type) {
        case ActionType.LOGIN_USER:
            return auth = action.payload.authUser
        case ActionType.REFRESH_TOKEN:
            return auth = { ...auth, token: action.payload.token }
        case ActionType.LOGOUT_USER:
            return auth = action.payload.authUser
        default:
            return auth
    }
}