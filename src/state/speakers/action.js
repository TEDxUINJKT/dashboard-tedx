const ActionType = {
    GET_SPEAKERS: 'GET_SPEAKERS',
}

function GetSpeakersActions(main = [], student = []) {
    return {
        type: ActionType.GET_SPEAKERS,
        payload: {
            speakers: { main, student }
        }
    }
}


export { ActionType, GetSpeakersActions }