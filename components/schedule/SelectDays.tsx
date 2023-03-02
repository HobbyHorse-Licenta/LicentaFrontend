import React, { useCallback, useState } from "react";
import { Pressable, View, Text} from "react-native";

import { useTheme } from "react-native-paper";

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
      <View style={SpacingStyles.daysContainer}>
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
        </View>
  );
};

export default SelectDays;