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
  textAbovePicker: string,
  time: Date
  setTime: Function
}

const SelectTimeIos = ({textAbovePicker, time, setTime} : timePickerInput) => {

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
 
  const onChangeDate = (selectedTime: Date | undefined) => {
    if (selectedTime) {
      setTime(selectedTime);
      setIsDatePickerVisible(false);
    }
  };

  const handleChangeTime = () => {
    console.log("HAA");
    setIsDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };  

  return (
    <View>
        <SelectTime textAbovePicker={textAbovePicker} time={time} onPress={handleChangeTime}/>
        <DateTimePickerModal
            style={styles.activePicker}
            isVisible={isDatePickerVisible}
            mode="time"
            display="spinner"
            pickerStyleIOS={{width: '100%'}}
            modalStyleIOS={{justifyContent: 'center', alignItems: 'center', width: '100%'}}
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
    </View>
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