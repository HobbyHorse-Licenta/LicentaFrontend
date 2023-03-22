import {createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MySchedules } from '../screens/postLogin/schedules';
import { Schedule } from '../types';

interface AppState {
    isLoggedIn: boolean,
    currentRoute: string | undefined,
    mySchedules: Array<Schedule> | undefined
}

const initialState: AppState = {
    isLoggedIn: true,
    currentRoute: undefined,
    mySchedules: undefined
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
        
      
    }
});

export const {setLoginState, setCurrentRoute, setMySchedules} = appStateSlice.actions

export default appStateSlice.reducer;