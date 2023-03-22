import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';


import uiReducer from './ui'
import appStateReducer from "./appState";
import createScheduleStateReducer from "./createScheduleState";

export default configureStore({
    reducer:{
        ui: uiReducer,
        appState: appStateReducer,
        createScheduleState: createScheduleStateReducer
    },
    // middleware: getDefaultMiddleware({
    //     serializableCheck: {
    //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //     },
    //   }),
})