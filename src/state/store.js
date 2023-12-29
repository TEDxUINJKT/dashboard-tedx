import { configureStore } from "@reduxjs/toolkit"

import ErrorReducer from './error/reducer'
import AuhtReducer from "./auth/reducer"
import UsersReducer from "./users/reducer";

const store = configureStore({
    reducer: {
        error: ErrorReducer,
        auth: AuhtReducer,
        users: UsersReducer
    }
});

export { store }