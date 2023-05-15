import { applyMiddleware, combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CircularJSON from 'circular-json';
import thunk from 'redux-thunk'
import logger from 'redux-logger';

import uiReducer from './ui'
import appStateReducer from "./appState";
import walkthroughReducer, { loadWalkthorughStateAsync } from "./walkthroughState"
import { AppState } from "./appState";
import createScheduleStateReducer, { CreateScheduleState } from "./createScheduleState";
import configProfileStateReducer from "./configProfileState"
import { WalkthroughState } from "./walkthroughState";
import { saveWalkthroughStateAsync } from "./walkthroughState";
import { debounce } from 'lodash';

export interface RootState {
  appState: AppState;
  createScheduleState: CreateScheduleState,
  walkthroughState: WalkthroughState
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
  whitelist: ['walkthrough']
  //serializer: serializer
}


const rootReducer = combineReducers({
  ui: uiReducer,
  appState: appStateReducer,
  createScheduleState: createScheduleStateReducer,
  configProfile: configProfileStateReducer,
  walkthroughState: persistReducer(persistConfig, walkthroughReducer)
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
})

const saveWalkthroughStateAsyncDebounced = debounce(saveWalkthroughStateAsync, 3000);

store.dispatch(loadWalkthorughStateAsync());

store.subscribe(() => {
  saveWalkthroughStateAsyncDebounced(store.getState().walkthroughState);
})

export const persistor = persistStore(store);