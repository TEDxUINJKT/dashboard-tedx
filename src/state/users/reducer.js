import { ActionType } from "./action"

export default function UsersReducer(users = [], action = {}) {
    switch (action.type) {
        case ActionType.GET_USER:
            return users = action.payload.users
        default:
            return users;
    }
}