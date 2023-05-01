import { applyMiddleware, combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CircularJSON from 'circular-json';
import thunk from 'redux-thunk'

import uiReducer from './ui'
import appStateReducer from "./appState";
import { AppState } from "./appState";
import createScheduleStateReducer, { CreateScheduleState } from "./createScheduleState";
import configProfileStateReducer from "./configProfileState"

export interface RootState {
  appState: AppState;
  createScheduleState: CreateScheduleState
}

///We use the serializer to make it ignore circular references when serializing and deserializing
//which caused the error "non serializable value in redux store" ALTHOUGH IT DIDNT FIX IT :))
// const serializer = {
//   serialize: (state) => CircularJSON.stringify(state),
//   deserialize: (serializedState) => CircularJSON.parse(serializedState),
//   options: {
//     ignoreCirculcarReferences: true,
//   },
// };

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  //serializer: serializer
}


const rootReducer = combineReducers({
  ui: uiReducer,
  appState: appStateReducer,
  createScheduleState: createScheduleStateReducer,
  configProfile: configProfileStateReducer
})


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer
})
//export const store = configureStore(persistedReducer, applyMiddleware(thunk));

export const persistor = persistStore(store)