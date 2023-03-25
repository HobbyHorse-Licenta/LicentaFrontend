import {createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SkateExperience, SkatePracticeStyles, SkatesType, SportName } from '../types';

interface ConfigProfileState {
    sport: SportName | undefined,
    skateType: SkatesType | undefined,
    skatePracticeStyle: SkatePracticeStyles | undefined
    skateExperience: SkateExperience | undefined
}

const initialState: ConfigProfileState = {
    sport: undefined,
    skateType: undefined,
    skatePracticeStyle: undefined,
    skateExperience: undefined
}

export const configProfileStateSlice = createSlice({
    name: 'configProfile',
    initialState,
    reducers: {
        setSport: (state, action: PayloadAction<SportName | undefined>) => {
            state.sport = action.payload;
        },
        setSkateType: (state, action: PayloadAction<SkatesType | undefined>) => {
            state.skateType = action.payload;
        },
        setSkatePracticeStyle: (state, action: PayloadAction<SkatePracticeStyles | undefined>) => {
            state.skatePracticeStyle = action.payload;
        },
        setSkateExperience: (state, action: PayloadAction<SkateExperience | undefined>) => {
            state.skateExperience = action.payload;
        }

      
    }
});

export const {setSport, setSkateType, setSkatePracticeStyle, setSkateExperience} = configProfileStateSlice.actions

export default configProfileStateSlice.reducer;