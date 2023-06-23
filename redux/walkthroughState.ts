import { async } from '@firebase/util'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AsyncLocalStorage } from 'async_hooks'
import { Console } from 'console'

export interface WalkthroughState {
    schedule: boolean,
    events: boolean
    myProfile: boolean

}

const initialState: WalkthroughState = {
    schedule: true,
    events: true,
    myProfile: true
}

const loadState = async () =>{
    try{
        const serializedState = await AsyncStorage.getItem("walkthrough");
        if(serializedState === null)
            return undefined;
        return JSON.parse(serializedState);
    }
    catch(error){
        return undefined;
    }
}

export const loadWalkthorughStateAsync = createAsyncThunk("walkthrough/loadWalkthorughStateAsync",
async() => {
    const state = await loadState();
    return state || initialState;
})

export const saveWalkthroughStateAsync = async(state) => {
    try{
        await AsyncStorage.setItem("walkthrough", JSON.stringify(state))
    }
    catch(error)
    {
        console.log(error)
    }
}

export const walkthroughStateSlice = createSlice({
    name: 'walkthrough',
    initialState,
    reducers: {
        setScheduleWalkthrough: (state, action: PayloadAction<boolean>) => {
            state.schedule = action.payload;
        },
        setEventsWalkthrough: (state, action: PayloadAction<boolean>) => {
            state.events = action.payload;
        },
        setMyProfileWalkthrough: (state, action: PayloadAction<boolean>) => {
            state.myProfile = action.payload;
        },
        resetWalkthroughState: state => initialState

      
    },
    extraReducers: (builder) => {
        builder.addCase(loadWalkthorughStateAsync.fulfilled, (state, action) => {
          return action.payload;
        });
      },
});

export const {setScheduleWalkthrough, setEventsWalkthrough,
    setMyProfileWalkthrough, resetWalkthroughState} = walkthroughStateSlice.actions

export default walkthroughStateSlice.reducer;