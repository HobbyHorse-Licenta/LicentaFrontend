import {createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UIState {
    notificationBarHeight: number,
    navigationBarHeight: number,
    topBarHeight: number,
    windowHeight: number 
    bottomBarHeight: number
}

const initialState: UIState = {
    notificationBarHeight: 0,
    navigationBarHeight: 0,
    windowHeight: 0,
    topBarHeight: 0, 
    bottomBarHeight: 0
  }

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setNotificationBarHeight: (state, action: PayloadAction<number>) => {
            state.notificationBarHeight = action.payload;
        },
        setNavigationBarHeight: (state, action: PayloadAction<number>) => {
            state.navigationBarHeight = action.payload;
        },
        setWindowHeight: (state, action: PayloadAction<number>) => {
            state.windowHeight = action.payload;
        },
        setTopBarHeight: (state, action: PayloadAction<number>) => {
            state.topBarHeight = action.payload;
        },
        setBottomBarHeight: (state, action: PayloadAction<number>) => {
            state.bottomBarHeight = action.payload;
        }
    }
});

export const {setNotificationBarHeight, setNavigationBarHeight,
     setTopBarHeight, setBottomBarHeight, setWindowHeight} = uiSlice.actions

export default uiSlice.reducer;