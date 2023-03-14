import {createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CreateScheduleState {
    
}

const initialState: CreateScheduleState = {
    
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