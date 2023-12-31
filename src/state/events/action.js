const ActionType = {
    GET_EVENT: 'GET_EVENT',
}

function GetEventsActions(events) {
    return {
        type: ActionType.GET_EVENT,
        payload: {
            events
        }
    }
}


export { ActionType, GetEventsActions }