import React, { useState } from "react";
import { Pressable, View, StyleSheet} from "react-native";

import {useTheme, Text} from 'react-native-paper'
import { scale } from "react-native-size-matters";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

import { SpacingStyles } from '../../styles'

interface timePickerInput {
  textAbovePicker: string
}

const SelectTimeAndroid = ({textAbovePicker} : timePickerInput) => {

  //const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [time, setTime] = useState<Date>(new Date())
 
  const theme = useTheme();

  const onChangeDate = (event, selectedTime: Date | undefined) => {
    if (selectedTime) {
      setTime(selectedTime);
     // setIsDatePickerVisible(false);
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

   // const hideDatePicker = () => {
  //   setIsDatePickerVisible(false);
  // };

  return (
      <View style={[SpacingStyles.selectTimeContainer,{backgroundColor: theme.colors.onSecondaryContainer, flexWrap: 'nowrap'}]}>
          
          <Text variant='bodyMedium'>
            {textAbovePicker}
          </Text>

         <Pressable onPress={handleChangeTime} style={[styles.picker]}>
            <Text>
              {time.getHours()} : {time.getMinutes()}
            </Text>
         </Pressable>

      </View>
  );
};

export default SelectTimeAndroid;

const styles = StyleSheet.create({
    picker: {
      margin: scale(10),
      borderRadius: 10,
      shadowOffset: {width: -2, height: 4},  
      shadowColor: '#DADADA',  
      shadowOpacity: 0.2,  
      shadowRadius: 3,  
    }
});