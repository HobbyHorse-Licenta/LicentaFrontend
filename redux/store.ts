import { configureStore } from "@reduxjs/toolkit";

import uiReducer from './ui'
import appStateReducer from "./appState";
export default configureStore({
    reducer:{
        ui: uiReducer,
        appState: appStateReducer
    }
})