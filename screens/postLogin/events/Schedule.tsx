import React from "react";
import { View } from 'react-native';

import { scale } from "react-native-size-matters";
import {Text} from 'react-native-paper'

import { SpacingStyles } from '../../../styles';
import { AddSports, ScheduleHeader, SelectDays, SelectLocation, SelectHourRange} from '../../../components/schedule';
// import { AddSports, ScheduleHeader, SelectDays, SelectTime } from '@schedule';
import { Layout3Piece } from '../../layouts';

const Schedule = () => {

  const getBody = () => {
    return(
      <View style={[SpacingStyles.centeredContainer, SpacingStyles.fullSizeContainer, {flex: 1, padding: scale(14)}]}>
        <View style={[SpacingStyles.centeredContainer, {flex: 1}]}>
          <Text>Days</Text>
          <SelectDays></SelectDays>
        </View>
        <View style={[SpacingStyles.centeredContainer, {flex: 1}]}>
          <SelectHourRange></SelectHourRange>
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