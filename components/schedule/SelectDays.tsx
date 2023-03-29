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

// const days: typeof WeekDays[] = [{name : 'S', index: 1}, 
// {name : 'M', index: 2},
// {name : 'T', index: 3},
// {name : 'W', index: 4},
// {name : 'T', index: 5},
// {name : 'F', index: 6},
// {name : 'S', index: 7},
// ];

const SelectDays = () => {

  const [selectedDays, setSelectedDays] = useState<Array<Day>>([]);
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    dispatch(setSelectedDaysState(selectedDays));
  }, [selectedDays])

  const isActiveDay = useCallback(
    (thisDay: Day, days: Array<Day>) => {
      return days.includes(thisDay);
    },
    []
  );

  const selectDay = (day: Day) => {
    if (isActiveDay(day, selectedDays)) {
      const filtered = selectedDays.filter((v) => v !== day);
      setSelectedDays(filtered);
    } else {
      setSelectedDays((prev) => [...prev, day]);
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
                      {day.name.minimumForm}
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