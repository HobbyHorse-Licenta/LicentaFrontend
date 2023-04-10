import {createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MySchedules } from '../screens/postLogin/schedules';
import { Schedule } from '../types';

interface AppState {
    isLoggedIn: boolean,
    currentRoute: string | undefined,
    mySchedules: Array<Schedule> | undefined,
    initialProfileConfigured: boolean
}

const initialState: AppState = {
    isLoggedIn: false,
    currentRoute: undefined,
    mySchedules: undefined,
    initialProfileConfigured: true
}

export const appStateSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        setLoginState: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        },
        setCurrentRoute: (state, action: PayloadAction<string>) => {
            state.currentRoute = action.payload;
        },
        setMySchedules: (state, action: PayloadAction<Array<Schedule>>) => {
            state.mySchedules = action.payload;
        },
        setInitialProfileConfigured: (state, action: PayloadAction<boolean>) => {
            state.initialProfileConfigured = action.payload;
        }
      
    }
});

export const {setLoginState, setCurrentRoute, setMySchedules, setInitialProfileConfigured} = appStateSlice.actions

export default appStateSlice.reducer;