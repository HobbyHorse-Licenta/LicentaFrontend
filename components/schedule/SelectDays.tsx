import React, { useCallback, useState, useEffect } from "react";
import { Pressable, View, StyleSheet} from "react-native";

import { useTheme, Text } from "react-native-paper";
import EStyleSheet from 'react-native-extended-stylesheet';
import { useDispatch } from 'react-redux';

import { SpacingStyles } from '../../styles'
import {Day, WeekDays} from '../../types';
import { scale } from "react-native-size-matters";
import { PrimaryContainer } from "../general";
import { setSelectedDaysState } from "../../redux/createScheduleState";

interface Input {
  selectedDays: Array<Day>,
  onSelectedDaysChange: (newSelectedDays: Array<Day>) => void
}

const SelectDays = ({selectedDays, onSelectedDaysChange}: Input) => {

  const theme = useTheme();

  const isActiveDay = useCallback(
    (thisDay: Day, days: Array<Day>) => {
      return days.includes(thisDay);
    },
    []
  );

  const selectDay = (day: Day) => {
    if (isActiveDay(day, selectedDays)) {
      const filtered = selectedDays.filter((v) => v !== day);
      onSelectedDaysChange(filtered);
    } else {
      onSelectedDaysChange([...selectedDays, day]);
    }
    Object.keys(WeekDays).forEach(e => console.log(`key=${e}  value=${WeekDays[e]}`));
  };

  return (
    <PrimaryContainer styleInput={{marginVertical: scale(10)}}>
      <Text>Days</Text>
      <View style={[styles.selectDaysContainer,{
        backgroundColor: 'purple'}]}>
        <View style={[SpacingStyles.daysContainer, {backgroundColor: theme.colors.primary}]}>
            {WeekDays.map((day) => {
              return (
                <Pressable key={day.index} onPress={() => selectDay(day)}>
                  <View
                    style={[
                      SpacingStyles.day, SpacingStyles.daySelected, {borderColor: theme.colors.onPrimaryContainer},
                      isActiveDay(day, selectedDays) 
                      && [{backgroundColor: theme.colors.surface}],
                    ]}
                  >
                    <Text style={isActiveDay(day, selectedDays) ? {color: theme.colors.onPrimary} : {color: 'black'}}>
                      {day.minimumForm}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
      </View>
    </PrimaryContainer> 
  );
};

export default SelectDays;

const styles = EStyleSheet.create({
  selectDaysContainer:{
    borderRadius: 20,
    width: '100%'
  }
});