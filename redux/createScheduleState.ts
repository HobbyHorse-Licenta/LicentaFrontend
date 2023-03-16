import {createSlice, PayloadAction } from '@reduxjs/toolkit'

import {Day, Zone} from '../types'

interface CreateScheduleState {
    selectedDays: Day[],
    zone: Zone | undefined,
    
    
}

const initialState: CreateScheduleState = {
    selectedDays: [],
    zone: undefined
}

export const createScheduleStateSlice = createSlice({
    name: 'createScheduleState',
    initialState,
    reducers: {
        // setLoginState: (state, action: PayloadAction<boolean>) => {
        //     state.isLoggedIn = action.payload;
        // },
      
    }
});

export const {} = createScheduleStateSlice.actions

export default createScheduleStateSlice.reducer;