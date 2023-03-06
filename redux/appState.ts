import {createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AppState {
    isLoggedIn: boolean
}

const initialState: AppState = {
    isLoggedIn: true
}

export const appStateSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        setLoginState: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        }
      
    }
});

export const {setLoginState} = appStateSlice.actions

export default appStateSlice.reducer;