import React, { useCallback } from "react";
import { Pressable, View } from "react-native";

import { useTheme, Text } from "react-native-paper";
import EStyleSheet from "react-native-extended-stylesheet";
import uuid from "react-native-uuid";

import { SpacingStyles } from "../../styles";
import { Day } from "../../types";
import { scale } from "react-native-size-matters";
import { PrimaryContainer } from "../general";
import dayScheduleUtils from "../../utils/DaySchedule";

interface Input {
  selectedDays: Array<Day>;
  onSelectedDaysChange: (newSelectedDays: Array<Day>) => void;
}

const SelectDays = ({ selectedDays, onSelectedDaysChange }: Input) => {
  const theme = useTheme();

  const isActiveDay = useCallback((thisDay: number, days: Array<Day>) => {
    return days.find(day => day.dayOfMonth === thisDay);
  }, []);

  const selectDay = (day: number) => {
    if (isActiveDay(day, selectedDays)) {
      const filtered = selectedDays.filter(v => v.dayOfMonth !== day);
      onSelectedDaysChange(filtered);
    } else {
      const newDay: Day = {
        id: uuid.v4().toString(),
        dayOfMonth: day,
      };
      onSelectedDaysChange([...selectedDays, newDay]);
    }
  };

  return (
    <PrimaryContainer styleInput={{ marginVertical: scale(10) }}>
      <Text>Days</Text>
      <View
        style={[
          styles.selectDaysContainer,
          {
            backgroundColor: "purple",
          },
        ]}
      >
        <View
          style={[
            SpacingStyles.daysContainer,
            { backgroundColor: theme.colors.primary },
          ]}
        >
          {dayScheduleUtils.getWeekDates().map(day => {
            return (
              <Pressable
                key={uuid.v4().toString()}
                onPress={() => selectDay(day)}
              >
                <View
                  style={[
                    SpacingStyles.day,
                    SpacingStyles.daySelected,
                    { borderColor: theme.colors.onPrimaryContainer },
                    isActiveDay(day, selectedDays) && [
                      { backgroundColor: theme.colors.surface },
                    ],
                  ]}
                >
                  <Text
                    style={
                      isActiveDay(day, selectedDays)
                        ? { color: theme.colors.onPrimary }
                        : { color: "black" }
                    }
                  >
                    {dayScheduleUtils.getDayOfWeekFromDayOfMonthMinimumForm(
                      day
                    )}
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
  selectDaysContainer: {
    borderRadius: 20,
    width: "100%",
  },
});
