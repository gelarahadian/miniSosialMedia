import { configureStore } from "@reduxjs/toolkit";

import postReducer from "../features/post/PostSlice";
import authSlice from "../features/Auth/AuthSlice";

export default configureStore({
    reducer: {
        posts: postReducer,
        auth: authSlice,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['user/signiIn/fulfilled', 'user/signUp/fulfilled'],
                ignoredActionPaths: ['meta.arg.navigate', 'payload.navigate'],

            }
        })
    }
})