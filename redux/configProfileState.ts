import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Gender,
  SkateExperience,
  SkatePracticeStyles,
  SkatesType,
  SportName,
} from "../types";

interface ConfigProfileState {
  sport: SportName | undefined;
  skateType: SkatesType | undefined;
  skatePracticeStyle: SkatePracticeStyles | undefined;
  skateExperience: SkateExperience | undefined;
  age: number | undefined;
  gender: Gender | undefined;
  name: string | undefined;
  shortDescription: string | undefined;
}

const initialState: ConfigProfileState = {
  sport: undefined,
  skateType: undefined,
  skatePracticeStyle: undefined,
  skateExperience: undefined,
  age: undefined,
  gender: undefined,
  name: undefined,
  shortDescription: undefined,
};

export const configProfileStateSlice = createSlice({
  name: "configProfile",
  initialState,
  reducers: {
    setSport: (state, action: PayloadAction<SportName | undefined>) => {
      state.sport = action.payload;
    },
    setSkateType: (state, action: PayloadAction<SkatesType | undefined>) => {
      state.skateType = action.payload;
    },
    setSkatePracticeStyle: (
      state,
      action: PayloadAction<SkatePracticeStyles | undefined>
    ) => {
      state.skatePracticeStyle = action.payload;
    },
    setSkateExperience: (
      state,
      action: PayloadAction<SkateExperience | undefined>
    ) => {
      state.skateExperience = action.payload;
    },
    setAge: (state, action: PayloadAction<number | undefined>) => {
      state.age = action.payload;
    },
    setGender: (state, action: PayloadAction<Gender | undefined>) => {
      state.gender = action.payload;
    },
    setName: (state, action: PayloadAction<string | undefined>) => {
      state.name = action.payload;
    },
    setShortDescription: (state, action: PayloadAction<string | undefined>) => {
      state.shortDescription = action.payload;
    },
    resetConfigProfileState: () => initialState,
  },
});

export const {
  setSport,
  setSkateType,
  setSkatePracticeStyle,
  setSkateExperience,
  setAge,
  setGender,
  setName,
  setShortDescription,
  resetConfigProfileState,
} = configProfileStateSlice.actions;

export default configProfileStateSlice.reducer;
