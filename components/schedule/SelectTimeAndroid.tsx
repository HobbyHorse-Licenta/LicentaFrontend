import React, { useState } from "react";
import { Pressable, View, StyleSheet} from "react-native";

import {useTheme, Text} from 'react-native-paper'
import { scale } from "react-native-size-matters";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

import { SpacingStyles } from '../../styles'
import { SelectTime } from "../general";

interface timePickerInput {
  textAbovePicker: string,
  time: Date
  setTime: Function
}

const SelectTimeAndroid = ({textAbovePicker, time, setTime} : timePickerInput) => {

 
  const theme = useTheme();

  const onChangeDate = (event, selectedTime: Date | undefined) => {
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  const handleChangeTime = () => {
    DateTimePickerAndroid.open({
      display: "clock",
      value: time,
      onChange: (event, selectedTime) => onChangeDate(event, selectedTime),
      mode: "time",
      is24Hour: true,
    });
  };

  return (
    <SelectTime textAbovePicker={textAbovePicker} time={time} onPress={handleChangeTime}>

    </SelectTime>
      
  );
};

export default SelectTimeAndroid;