import { configureStore } from "@reduxjs/toolkit"

import ErrorReducer from './error/reducer'
import AuhtReducer from "./auth/reducer"

const store = configureStore({
    reducer: {
        error: ErrorReducer,
        auth: AuhtReducer,
    }
});

export { store }