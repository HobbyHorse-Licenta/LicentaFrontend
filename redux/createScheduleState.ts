import {createSlice, PayloadAction } from '@reduxjs/toolkit'

import {Day, StateTimeRange, TimeRange, Zone} from '../types'

interface CreateScheduleState {
    selectedDays: Day[] | undefined,
    zone: Zone | undefined,
    timeRange: StateTimeRange | undefined
    
    
}

const initialState: CreateScheduleState = {
    selectedDays: undefined,
    zone: undefined,
    timeRange: undefined
}

export const createScheduleStateSlice = createSlice({
    name: 'createScheduleState',
    initialState,
    reducers: {
        setSelectedDaysState: (state, action: PayloadAction<Array<Day>>) => {
            state.selectedDays = action.payload;
        },
        setTimeRange: (state, action: PayloadAction<StateTimeRange>) => {
            state.timeRange = action.payload;
        },
      
    }
});

export const {setSelectedDaysState, setTimeRange} = createScheduleStateSlice.actions

export default createScheduleStateSlice.reducer;