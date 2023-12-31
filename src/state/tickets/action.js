const ActionType = {
    GET_TICKETS: 'GET_TICKETS',
}

function GetTicketsActions(tickets) {
    return {
        type: ActionType.GET_TICKETS,
        payload: {
            tickets
        }
    }
}


export { ActionType, GetTicketsActions }