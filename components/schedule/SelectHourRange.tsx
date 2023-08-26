import React from "react";
import { Platform, View } from "react-native";

import { scale } from "react-native-size-matters";
import { start } from "repl";
import { useTourGuideController } from "rn-tourguide";

import { SpacingStyles } from "../../styles";
import { PrimaryContainer } from "../general";
import SelectTimeAndroid from './SelectTimeAndroid';
import SelectTimeIos from './SelectTimeIos';

interface Input {
  startTime: Date,
  endTime: Date,
  onStartTimeChange: (newStartTime: Date) => void,
  onEndTimeChange: (newEndTime: Date) => void,
}

const SelectHourRange = ({startTime, endTime, onStartTimeChange, onEndTimeChange} : Input) => {

    const {
      TourGuideZone
    } = useTourGuideController('schedule')

    const setEndTimeSchedule = (selectedEndTime: Date) => {
      if(selectedEndTime > startTime)
        onEndTimeChange(selectedEndTime);
    }

    const setStartTimeSchedule = (selectedStartTime: Date) => {
      onStartTimeChange(selectedStartTime);
      if(endTime < selectedStartTime)
        onEndTimeChange(selectedStartTime);
    }

    console.log("start time: " + startTime);
    console.log("end time: " + endTime);
    return(
      <TourGuideZone
      zone={1}
      text={"Available hour range is 08:00 - 22:00"}
      borderRadius={16}
      >
      <PrimaryContainer styleInput={{marginVertical: scale(10)}}>
        {/* {   
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
        } */}
      </PrimaryContainer>
      </TourGuideZone>
    );
};

export default SelectHourRange;