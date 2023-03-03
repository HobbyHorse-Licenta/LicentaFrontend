import React, { useCallback, useState } from "react";
import { Pressable, View} from "react-native";

import { useTheme, Text } from "react-native-paper";
import EStyleSheet from 'react-native-extended-stylesheet';

import { SpacingStyles } from '../../styles'
import {Day} from '../../types';

const days: Day[] = [{name : 'S', index: 1}, 
{name : 'M', index: 2},
{name : 'T', index: 3},
{name : 'W', index: 4},
{name : 'T', index: 5},
{name : 'F', index: 6},
{name : 'S', index: 7},
];

const SelectDays = () => {

  const [selectedDays, setSelectedDays] = useState<Array<Day>>([]);

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
      setSelectedDays(filtered);
    } else {
      setSelectedDays((prev) => [...prev, day]);
    }
  };

  return (
    <View style={[styles.daysContainer,{
      backgroundColor: 'purple'}]}>
      {/* <View style={[SpacingStyles.daysContainer, {backgroundColor: theme.colors.primary}]}>
          {days.map((day) => {
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
                    {day.name}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View> */}
    </View>
     
  );
};

export default SelectDays;

const styles = EStyleSheet.create({
  selectDaysContainer:{
    borderRadius: 20,
    width: 80,
    height: 30
  }
});