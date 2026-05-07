import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import logger from 'redux-logger'

import authReducer from '../features/auth/authSlice'
import ncrReducer from '../features/ncrs/ncrSlice'
import Profile from "../features/profile/profieSlice";
import Training from '../features/training/trainingSlice'
import Request from '../features/request/requestSlice'
import { apiSlice } from "../app/api/apiSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        ncr: ncrReducer,
        profile: Profile,
        training: Training,
        request: Request,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

setupListeners(store.dispatch)
