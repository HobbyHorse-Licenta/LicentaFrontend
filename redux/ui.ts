import {createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UIState {
    windowHeight: number,
}

const initialState: UIState = {
    windowHeight: 0,
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setWindowHeight: (state, action: PayloadAction<number>) => {
            state.windowHeight = action.payload;
        }
    }
});

export const {setWindowHeight} = uiSlice.actions

export default uiSlice.reducer;