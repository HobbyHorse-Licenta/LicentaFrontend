import React, { useState, useEffect } from "react";
import { Pressable, View, StyleSheet} from "react-native";

import {useTheme, Text} from 'react-native-paper'
import { scale } from "react-native-size-matters";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from "date-fns";

import { SpacingStyles } from '../../styles'
import Strings from './../../assets/strings'
import { SelectTime } from "../general";

interface timePickerInput {
  textAbovePicker: string
}

const SelectTimeIos = ({textAbovePicker} : timePickerInput) => {

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [time, setTime] = useState<Date>(new Date())
 
  const onChangeDate = (selectedTime: Date | undefined) => {
    if (selectedTime) {
      console.log("Time: " + time);
      console.log("selected Time: " + selectedTime);

      setTime(selectedTime);
      setIsDatePickerVisible(false);
    }
  };

  const handleChangeTime = () => {
    console.log("CIAO");
    setIsDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  useEffect(() => {
    console.log("visible: " + isDatePickerVisible);
  }, [isDatePickerVisible])
  

  return (
        <SelectTime textAbovePicker={textAbovePicker} time={time} onPress={handleChangeTime}>
          <DateTimePickerModal
            style={styles.activePicker}
            isVisible={isDatePickerVisible}
            mode="time"
            display="spinner"
            onConfirm={onChangeDate}
            onCancel={hideDatePicker}
            cancelTextIOS = {Strings.cancel}
            confirmTextIOS= {Strings.finish}
            minimumDate={new Date("2023-08-29T05:00:00.000Z")}
            maximumDate={new Date("2023-08-29T19:00:00.000Z")}
            locale="en_EN"
            textColor="black"
            is24Hour={true}
            date={time}
          />
        </SelectTime>
  );
};

export default SelectTimeIos;

const styles = StyleSheet.create({
    picker: {
      margin: scale(10),
      borderRadius: 10,
      shadowOffset: {width: -2, height: 4},  
      shadowColor: '#DADADA',  
      shadowOpacity: 0.2,  
      shadowRadius: 3,  
    },
    activePicker: {
      width: scale(200),
      height: scale(200)
    }
});