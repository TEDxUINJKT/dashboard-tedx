const ActionType = {
    GET_USER: 'GET_USER',
}

function GetUsersActions(users) {
    return {
        type: ActionType.GET_USER,
        payload: {
            users
        }
    }
}


export { ActionType, GetUsersActions }