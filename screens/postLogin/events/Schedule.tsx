import React from "react";
import { View } from 'react-native';

import { scale } from "react-native-size-matters";
import {Text} from 'react-native-paper'

import { SpacingStyles } from '../../../styles';
import { AddSports, ScheduleHeader, SelectDays, SelectLocation, SelectHourRange} from '../../../components/schedule';
// import { AddSports, ScheduleHeader, SelectDays, SelectTime } from '@schedule';
import { Layout2PieceForNavigator } from '../../layouts';

const Schedule = () => {

  const getBody = () => {
    return(
      <View style={[SpacingStyles.centeredContainer, SpacingStyles.fullSizeContainer, {flex: 1, padding: scale(14)}]}>
        <View style={[SpacingStyles.centeredContainer, {flex: 0.8}]}>
          <SelectDays></SelectDays>
        </View>
        <View style={[SpacingStyles.centeredContainer, {flex: 0.9}]}>
          <SelectHourRange></SelectHourRange>
        </View>
        <View style={[SpacingStyles.centeredContainer, {flex: 0.7}]}>
         <AddSports></AddSports>
        </View>
        <View style={[SpacingStyles.centeredContainer, {flex: 0.8}]}>
         <SelectLocation></SelectLocation>
        </View>
      </View>
    );
  }

  return (
     <Layout2PieceForNavigator 
        header={<ScheduleHeader></ScheduleHeader>}
        body={getBody()}
     ></Layout2PieceForNavigator>
  );
};

export default Schedule;