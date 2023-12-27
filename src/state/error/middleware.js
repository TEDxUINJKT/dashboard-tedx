import { IsErrorAction, IsntErrorAction } from './action'

function ShowError(message) {
    return dispatch => {
        dispatch(IsErrorAction(message))
    }
}

function HideError() {
    return dispatch => {
        dispatch(IsntErrorAction())
    }
}

export { ShowError, HideError }