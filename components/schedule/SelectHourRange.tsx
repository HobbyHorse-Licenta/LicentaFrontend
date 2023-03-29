import React, {useState, useEffect} from "react";
import { Platform, View } from "react-native";

import {useDispatch} from 'react-redux';
import uuid from 'react-native-uuid';

import { setTimeRange } from "../../redux/createScheduleState";
import { SpacingStyles } from "../../styles";
import { PrimaryContainer } from "../general";
import SelectTimeAndroid from './SelectTimeAndroid';
import SelectTimeIos from './SelectTimeIos';
import { StateTimeRange, TimeRange } from "../../types";
import { scale } from "react-native-size-matters";

const SelectHourRange = () => {

    const [startTime, setStartTime] = useState<Date>(new Date())
    const [endTime, setEndTime] = useState<Date>(new Date())

    const dispatch = useDispatch();
    useEffect(() => {
      const range: StateTimeRange = {
        startTime: startTime.getTime(),
        endTime: endTime.getTime()
      }
      dispatch(setTimeRange(range));
    }, [startTime])
    
    const setEndTimeSchedule = (selectedEndTime: Date) => {
      if(selectedEndTime > startTime)
        setEndTime(selectedEndTime);
    }

    const setStartTimeSchedule = (selectedStartTime: Date) => {
      setStartTime(selectedStartTime);
      if(endTime < selectedStartTime)
        setEndTime(selectedStartTime);
    }

    return(
      <PrimaryContainer styleInput={{marginVertical: scale(10)}}>
        {   
        Platform.OS === "android" ?
        ( 
          <View style={[SpacingStyles.centeredContainer, {flexDirection: 'row'}]}>
            <SelectTimeAndroid time={startTime} setTime={setStartTimeSchedule} textAbovePicker="Start time"></SelectTimeAndroid>
            <SelectTimeAndroid time={endTime} setTime={setEndTimeSchedule} textAbovePicker="End time"></SelectTimeAndroid>
          </View>
        ):
        (
          <View style={[SpacingStyles.centeredContainer, {flexDirection: 'row'}]}>
            <SelectTimeIos time={startTime} setTime={setStartTimeSchedule} textAbovePicker="Start time"></SelectTimeIos>
            <SelectTimeIos time={endTime} setTime={setEndTimeSchedule} textAbovePicker="End time"></SelectTimeIos>
          </View>
        )
        }
      </PrimaryContainer>
    );
};

export default SelectHourRange;