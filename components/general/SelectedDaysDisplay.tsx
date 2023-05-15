import React, { useCallback } from "react";
import {View} from "react-native";

import { useTheme, Text } from "react-native-paper";
import EStyleSheet from 'react-native-extended-stylesheet';

import { SpacingStyles } from '../../styles'
import {Day, WeekDays} from '../../types';
import { scale } from "react-native-size-matters";
import PrimaryContainer from "../general/PrimaryContainer";


interface Input {
    selectedDays: Array<Day>
}
const SelectedDaysDisplay = ({selectedDays} : Input) => {

  const theme = useTheme();
  const isActiveDay = useCallback(
    (thisDay: Day, days: Array<Day>) => {
      return days.find(day => {
        return day.index === thisDay.index && day.longForm === thisDay.longForm 
        && day.shortForm === thisDay.shortForm && day.minimumForm === thisDay.minimumForm
      })
    },
    []
  );

  return (
    <PrimaryContainer styleInput={{...styles.daysContainer/*, backgroundColor: theme.colors.primary*/}}>
        {WeekDays.map((day, index) => {
            return (
                <View key={index}
                style={[
                    SpacingStyles.day, SpacingStyles.daySelected, {borderColor: theme.colors.onPrimaryContainer},
                    isActiveDay(day, selectedDays) && [{backgroundColor: theme.colors.surface}],
                ]}
                >
                <Text style={isActiveDay(day, selectedDays) ? {color: theme.colors.onPrimary} : {color: 'black'}}>
                    {day.minimumForm}
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