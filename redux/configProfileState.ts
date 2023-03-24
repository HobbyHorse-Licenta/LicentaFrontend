import {createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SkateType, SportName } from '../types';

interface ConfigProfileState {
    sport: SportName | undefined,
    skateType: SkateType | undefined
}

const initialState: ConfigProfileState = {
    sport: undefined,
    skateType: undefined
}

export const configProfileStateSlice = createSlice({
    name: 'configProfile',
    initialState,
    reducers: {
        setSport: (state, action: PayloadAction<SportName | undefined>) => {
            state.sport = action.payload;
        },
        setSkateType: (state, action: PayloadAction<SkateType | undefined>) => {
            state.skateType = action.payload;
        }

      
    }
});

export const {setSport, setSkateType} = configProfileStateSlice.actions

export default configProfileStateSlice.reducer;