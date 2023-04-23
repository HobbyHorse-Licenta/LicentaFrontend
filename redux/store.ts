import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import uiReducer from './ui'
import appStateReducer from "./appState";
import { AppState } from "./appState";
import createScheduleStateReducer from "./createScheduleState";
import configProfileStateReducer from "./configProfileState"



export interface RootState {
  appState: AppState;
  // Add types for other reducers here...
}

const persistConfig = {
  key: 'root',
  storage,
}


const rootReducer = combineReducers({
  ui: uiReducer,
  appState: appStateReducer,
  createScheduleState: createScheduleStateReducer,
  configProfile: configProfileStateReducer
})


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    // reducer:{
    //     ui: uiReducer,
    //     appState: appStateReducer,
    //     createScheduleState: createScheduleStateReducer,
    //     configProfile: configProfileStateReducer
    // },
    reducer: persistedReducer
})

export const persistor = persistStore(store)