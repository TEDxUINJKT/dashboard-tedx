import { ActionType } from "./action"

export default function OrdersReducer(orders = [], action = {}) {
    switch (action.type) {
        case ActionType.GET_ORDER_LIST:
            return orders = action.payload.orders
        default:
            return orders;
    }
}