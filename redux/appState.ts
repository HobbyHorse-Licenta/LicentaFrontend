import {createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AppState {
    isLoggedIn: boolean,
    currentRoute: string | undefined
}

const initialState: AppState = {
    isLoggedIn: true,
    currentRoute: undefined
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
        }
      
    }
});

export const {setLoginState, setCurrentRoute} = appStateSlice.actions

export default appStateSlice.reducer;