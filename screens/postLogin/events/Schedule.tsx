import React from "react";
import { View, Text } from 'react-native';

import { scale } from "react-native-size-matters";

import { SpacingStyles } from '../../../styles';
import { AddSports, ScheduleHeader, SelectDays, SelectLocation, SelectTime } from '../../../components/schedule';
// import { AddSports, ScheduleHeader, SelectDays, SelectTime } from '@schedule';
import Layout3Piece from "../Layout3Piece";

const Schedule = () => {

  const getBody = () => {
    return(
      <View style={[SpacingStyles.centeredContainer, SpacingStyles.fullSizeContainer, {flex: 1, padding: scale(14)}]}>
        <View style={[SpacingStyles.centeredContainer, {flex: 1}]}>
          <Text>Days</Text>
          <SelectDays></SelectDays>
        </View>
        <View style={[SpacingStyles.centeredContainer, {flex: 1, flexDirection: 'row'}]}>
          <Text>Time</Text>
          <SelectTime textAbovePicker="Start time"></SelectTime>
          <SelectTime textAbovePicker="End time"></SelectTime>
        </View>
        <View style={[SpacingStyles.centeredContainer, {flex: 1}]}>
         <AddSports></AddSports>
        </View>
        <View style={[SpacingStyles.centeredContainer, {flex: 1}]}>
         <SelectLocation></SelectLocation>
        </View>
      </View>
    );
  }

  return (
     <Layout3Piece 
                   header={<ScheduleHeader></ScheduleHeader>}
                   body={getBody()}
                   footer={<View></View>}
     ></Layout3Piece>
  );
};

export default Schedule;