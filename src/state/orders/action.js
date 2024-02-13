const ActionType = {
    GET_ORDER_LIST: 'GET_ORDER_LIST',
}

function GetOrderListActions(orders) {
    return {
        type: ActionType.GET_ORDER_LIST,
        payload: {
            orders
        }
    }
}


export { ActionType, GetOrderListActions }