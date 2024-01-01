import { ActionType } from "./action"

export default function ContentsReducer(contents = [], action = {}) {
    switch (action.type) {
        case ActionType.GET_CONTENTS:
            return contents = action.payload.contents
        default:
            return contents;
    }
}