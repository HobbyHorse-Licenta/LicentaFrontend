import AsyncStorage from '@react-native-async-storage/async-storage'
import {createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SkateProfile } from '../types'

export interface GlobalState {
    currentRoute: string | undefined,
    currentSkateProfile: SkateProfile | undefined,
    
}

const initialState: GlobalState = {
    currentRoute: undefined,
    currentSkateProfile: undefined
}

const loadState = async () =>{
    try{
        const serializedState = await AsyncStorage.getItem("global");

        if(serializedState === null)
            return undefined;
        return JSON.parse(serializedState);
    }
    catch(error){
        return undefined;
    }
}

export const loadGlobalStateAsync = createAsyncThunk("global/loadGlobalStateAsync",
async() => {
    const state = await loadState();
    return state || initialState;
})

export const saveGlobalStateAsync = async(state) => {
    try{
        await AsyncStorage.setItem("global", JSON.stringify(state))
    }
    catch(error)
    {
        console.log(error)
    }
}

export const globalStateSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setCurrentRoute: (state, action: PayloadAction<string | undefined>) => {
            state.currentRoute = action.payload;
        },
        setCurrentSkateProfile: (state, action: PayloadAction<SkateProfile>) => {
            state.currentSkateProfile = action.payload;
        },
        resetGlobalState: state => initialState

      
    },
    extraReducers: (builder) => {
        builder.addCase(loadGlobalStateAsync.fulfilled, (state, action) => {
         return action.payload;
        });
      },
});

export const {setCurrentRoute, setCurrentSkateProfile, resetGlobalState} = globalStateSlice.actions

export default globalStateSlice.reducer;