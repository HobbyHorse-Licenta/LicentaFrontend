import {createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Schedule, SkateProfile, Skill, User } from '../types';

export interface AppState {
    isLoading: boolean,
    user: User | undefined,
    userId: string | undefined,
    JWTToken: string | undefined,
    currentRoute: string | undefined,
    currentSkateProfile: SkateProfile | undefined,
    mySchedules: Array<Schedule> | undefined,
    addingSkateProfile:  boolean,
    initialProfileConfigured: boolean,
    allSkills: Array<Skill> | undefined,
}

const initialState: AppState = {
    isLoading: false,
    user: undefined,
    userId: undefined,
    JWTToken: undefined,
    currentRoute: undefined,
    currentSkateProfile: undefined,
    mySchedules: undefined,
    addingSkateProfile: false,
    initialProfileConfigured: true,
    allSkills: undefined,
}

export const appStateSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        setAllSkills: (state, action: PayloadAction<Array<Skill> | undefined>) => {
            state.allSkills = action.payload;
        },
        setAddingSkateProfile: (state, action: PayloadAction<boolean>) => {
            state.addingSkateProfile = action.payload;
        },
        setCurrentSkateProfile: (state, action: PayloadAction<SkateProfile>) => {
            state.currentSkateProfile = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setUser: (state, action: PayloadAction<User | undefined>) => {
            state.user = action.payload;
        },
        setUserId:(state, action: PayloadAction<string | undefined>) => {
            state.userId = action.payload;
        },
        setJWTToken: (state, action: PayloadAction<string | undefined>) => {
            state.JWTToken = action.payload;
        },
        setCurrentRoute: (state, action: PayloadAction<string | undefined>) => {
            state.currentRoute = action.payload;
        },
        setMySchedules: (state, action: PayloadAction<Array<Schedule>>) => {
            state.mySchedules = action.payload;
        },
        setInitialProfileConfigured: (state, action: PayloadAction<boolean>) => {
            state.initialProfileConfigured = action.payload;
        },
        resetAppState: state => initialState
      
    }
});

export const {setCurrentRoute, setMySchedules, setUserId, setCurrentSkateProfile,
    setInitialProfileConfigured, setUser, setJWTToken, resetAppState, setIsLoading,
    setAddingSkateProfile, setAllSkills} = appStateSlice.actions

export default appStateSlice.reducer;