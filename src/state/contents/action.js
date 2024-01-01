const ActionType = {
    GET_CONTENTS: 'GET_CONTENTS',
}

function GetContentsActions(contents) {
    return {
        type: ActionType.GET_CONTENTS,
        payload: {
            contents
        }
    }
}


export { ActionType, GetContentsActions }