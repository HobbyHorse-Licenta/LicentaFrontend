import {createSlice, PayloadAction } from '@reduxjs/toolkit'

import {Day, Gender, Schedule, Zone} from '../types'

export interface CreateScheduleState {
    selectedDays: Day[] | undefined,
    zone: Zone | undefined,
    startTime: number | undefined,
    endTime: number | undefined,
    minimumAge: number | undefined,
    maximumAge: number | undefined,
    gender: Gender | undefined,
    maxNumberOfPeople: number | undefined
}

const initialState: CreateScheduleState = {
    selectedDays: undefined,
    zone: undefined,
    startTime: undefined,
    endTime: undefined,
    minimumAge: undefined,
    maximumAge: undefined,
    gender: Gender.Mixed,
    maxNumberOfPeople: undefined
}

export const createScheduleStateSlice = createSlice({
    name: 'createScheduleState',
    initialState,
    reducers: {
        setSelectedDaysState: (state, action: PayloadAction<Array<Day> | undefined>) => {
            state.selectedDays = action.payload;
        },
        setZone: (state, action: PayloadAction<Zone | undefined>) => {
            state.zone = action.payload;
        },
        setStartTime: (state, action: PayloadAction<number | undefined>) => {
            state.startTime = action.payload;
        },
        setEndTime: (state, action: PayloadAction<number | undefined>) => {
            state.endTime = action.payload;
        },
        setMinimumAge: (state, action: PayloadAction<number | undefined>) => {
            state.minimumAge = action.payload;
        },
        setMaximumAge: (state, action: PayloadAction<number | undefined>) => {
            state.maximumAge = action.payload;
        },
        setGender: (state, action: PayloadAction<Gender | undefined>) => {
            state.gender = action.payload;
        },
        setMaxNumberOfPeople: (state, action: PayloadAction<number | undefined>) => {
            state.maxNumberOfPeople = action.payload;
        },
        setExistingScheduleState: (state, action: PayloadAction<Schedule>) => {
            state.selectedDays = action.payload.days;
            state.zone = action.payload.zones[0];
            state.startTime = action.payload.startTime;
            state.endTime = action.payload.endTime;
            state.minimumAge = action.payload.minimumAge;
            state.maximumAge = action.payload.maximumAge;
            state.gender = action.payload.gender;
            state.maxNumberOfPeople = action.payload.maxNumberOfPeople;
        },
        resetCreateScheduleState: state => initialState
      
    }
});

export const {setSelectedDaysState, setZone, setStartTime, setEndTime,
            setMinimumAge, setMaximumAge, setGender, setMaxNumberOfPeople,
            setExistingScheduleState, resetCreateScheduleState} = createScheduleStateSlice.actions

export default createScheduleStateSlice.reducer;