import {createSlice, PayloadAction } from '@reduxjs/toolkit'
import {Dimensions} from 'react-native';


const screenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;

interface UIState {
    statusBarHeight: number,
    bottomBarHeight: number,
    navigationBarHeight: number,
    windowHeight: number,
    windowHeightWithoutBottomBar: number,
}

const initialState: UIState = {
    statusBarHeight: 0,
    bottomBarHeight: 0,
    navigationBarHeight: 0,
    windowHeight: 0,
    windowHeightWithoutBottomBar: 0,
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setStatusBarHeight: (state, action: PayloadAction<number>) => {
            state.statusBarHeight = action.payload;

            state.windowHeightWithoutBottomBar = windowHeight - state.statusBarHeight - state.navigationBarHeight;
            state.windowHeight = windowHeight - state.statusBarHeight - state.bottomBarHeight - state.navigationBarHeight;
        },
        setNavigationBarHeight: (state, action: PayloadAction<number>) => {
            state.navigationBarHeight = action.payload;

            state.windowHeightWithoutBottomBar = windowHeight - state.statusBarHeight - state.navigationBarHeight;
            state.windowHeight = windowHeight - state.statusBarHeight - state.bottomBarHeight - state.navigationBarHeight;
        },
        setBottomBarHeight: (state, action: PayloadAction<number>) => {
            state.bottomBarHeight = action.payload;

            state.windowHeight = windowHeight - state.statusBarHeight - state.bottomBarHeight - state.navigationBarHeight;
        },
    }
});

export const {setStatusBarHeight, setNavigationBarHeight, setBottomBarHeight} = uiSlice.actions

export default uiSlice.reducer;