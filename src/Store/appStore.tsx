import {configureStore} from "@reduxjs/toolkit";

import appSlice from "./appSlice";
import { apiSlice } from "./apiSlice";

export const appStore=configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer
        
      

    },
    //@ts-ignore
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})
