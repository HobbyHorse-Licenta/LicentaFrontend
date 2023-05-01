import React, {useState, useEffect} from "react";
import { Platform, View } from "react-native";

import {useDispatch} from 'react-redux';
import uuid from 'react-native-uuid';

import { setStartTime, setEndTime } from "../../redux/createScheduleState";
import { SpacingStyles } from "../../styles";
import { PrimaryContainer } from "../general";
import SelectTimeAndroid from './SelectTimeAndroid';
import SelectTimeIos from './SelectTimeIos';
import { scale } from "react-native-size-matters";

const SelectHourRange = () => {

    const [startTime, setStart] = useState<Date>(new Date())
    const [endTime, setEnd] = useState<Date>(new Date())

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(setStartTime(startTime.getTime()));
      dispatch(setEndTime(endTime.getTime()));
    }, [startTime, endTime])
    
    const setEndTimeSchedule = (selectedEndTime: Date) => {
      if(selectedEndTime > startTime)
        setEnd(selectedEndTime);
    }

    const setStartTimeSchedule = (selectedStartTime: Date) => {
      setStart(selectedStartTime);
      if(endTime < selectedStartTime)
        setEnd(selectedStartTime);
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