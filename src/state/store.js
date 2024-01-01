import { configureStore } from "@reduxjs/toolkit"

import ErrorReducer from './error/reducer'
import AuhtReducer from "./auth/reducer"
import UsersReducer from "./users/reducer"
import PartnersReducer from "./partners/reducer"
import SpeakersReducer from "./speakers/reducer"
import EventsReducer from "./events/reducer"
import TicketsReducer from "./tickets/reducer"
import ContentsReducer from "./contents/reducer"

const store = configureStore({
    reducer: {
        error: ErrorReducer,
        auth: AuhtReducer,
        users: UsersReducer,
        partners: PartnersReducer,
        speakers: SpeakersReducer,
        events: EventsReducer,
        tickets: TicketsReducer,
        contents: ContentsReducer
    }
});

export { store }