import React, { useCallback } from "react";
import {View} from "react-native";

import { useTheme, Text } from "react-native-paper";
import EStyleSheet from 'react-native-extended-stylesheet';

import { SpacingStyles } from '../../styles'
import {Day} from '../../types';
import { scale } from "react-native-size-matters";
import mapScheduleUtils from '../../utils/DaySchedule';
import PrimaryContainer from "../general/PrimaryContainer";


interface Input {
    selectedDays: Array<Day>
}
const SelectedDaysDisplay = ({selectedDays} : Input) => {

  const theme = useTheme();
  const isActiveDay = useCallback(
    (thisDay: number, days: Array<Day>) => {
      if(days !== undefined)
      {
        return days.find(day => {
          return day.dayOfMonth === thisDay
        })
      }
      else return false;
    },
    []
  );

  return (
    <PrimaryContainer styleInput={{...styles.daysContainer/*, backgroundColor: theme.colors.primary*/}}>
        {mapScheduleUtils.getWeekDates().map((day, index) => {
            return (
                <View key={index}
                style={[
                    SpacingStyles.day, SpacingStyles.daySelected, {borderColor: theme.colors.onPrimaryContainer},
                    isActiveDay(day, selectedDays) && [{backgroundColor: theme.colors.surface}],
                ]}
                >
                <Text style={isActiveDay(day, selectedDays) ? {color: theme.colors.onPrimary} : {color: 'black'}}>
                    {mapScheduleUtils.getDayOfWeekFromDayOfMonthMinimumForm(day)}
                </Text>
                </View>
            );
        })}
    </PrimaryContainer> 
  );
};

export default SelectedDaysDisplay;

const styles = EStyleSheet.create({
    daysContainer:{
        flexDirection: "row",
        justifyContent: "space-evenly",
        flexWrap: 'nowrap',
        paddingVertical: scale(16),
        marginVertical: scale(10),
        borderRadius: 20,
        width: '100%'
    }
});