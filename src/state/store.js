import { configureStore } from "@reduxjs/toolkit"

import LoadingReducer from "./loading/reducer"
import AuhtReducer from "./auth/reducer"
import UsersReducer from "./users/reducer"
import PartnersReducer from "./partners/reducer"
import SpeakersReducer from "./speakers/reducer"
import EventsReducer from "./events/reducer"
import TicketsReducer from "./tickets/reducer"
import ContentsReducer from "./contents/reducer"
import OrdersReducer from "./orders/reducer"

const store = configureStore({
    reducer: {
        loading: LoadingReducer,
        auth: AuhtReducer,
        users: UsersReducer,
        partners: PartnersReducer,
        speakers: SpeakersReducer,
        events: EventsReducer,
        tickets: TicketsReducer,
        contents: ContentsReducer,
        orders: OrdersReducer
    }
});

export { store }