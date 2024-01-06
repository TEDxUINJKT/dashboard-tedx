const ActionType = {
    START_LOADING: 'START_LOADING',
    FETCH_LOADING: 'FETCH_LOADING',
    FINISH_LOADING: 'FINISH_LOADING',
    RESET_LOADING: 'RESET_LOADING'
}

function StartLoadingActions() {
    return {
        type: ActionType.START_LOADING,
    }
}

function FetchLoadingActions() {
    return {
        type: ActionType.FETCH_LOADING,
    }
}


function FinishLoadingActions() {
    return {
        type: ActionType.FINISH_LOADING,
    }
}

function ResetLoadingActions() {
    return {
        type: ActionType.FINISH_LOADING,
    }
}



export { ActionType, StartLoadingActions, FetchLoadingActions, FinishLoadingActions, ResetLoadingActions }