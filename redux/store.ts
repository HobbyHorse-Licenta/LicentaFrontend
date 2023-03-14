import { configureStore } from "@reduxjs/toolkit";

import uiReducer from './ui'
import appStateReducer from "./appState";
import createScheduleStateReducer from "./createScheduleState";

export default configureStore({
    reducer:{
        ui: uiReducer,
        appState: appStateReducer,
        createScheduleState: createScheduleStateReducer
    }
})