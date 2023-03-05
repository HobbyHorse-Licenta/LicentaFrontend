import React, { useState } from "react";
import { Pressable, View, StyleSheet} from "react-native";

import {useTheme, Text} from 'react-native-paper'
import { scale } from "react-native-size-matters";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from '@react-native-community/datetimepicker';

import { SpacingStyles } from '../../styles'
import Strings from './../../assets/strings'

interface timePickerInput {
  textAbovePicker: string
}

const SelectTime = ({textAbovePicker} : timePickerInput) => {

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [time, setTime] = useState<Date>(new Date())
 
  const theme = useTheme();

  const onChangeDate = (selectedTime: Date | undefined) => {
    if (selectedTime) {
      setTime(selectedTime);
      setIsDatePickerVisible(false);
    }
  };

  const handleChangeTime = () => {
    setIsDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  return (
      <View style={[SpacingStyles.selectTimeContainer,{backgroundColor: theme.colors.onSecondaryContainer, flexWrap: 'nowrap'}]}>
          <Text variant='bodyMedium'>
            {textAbovePicker}
          </Text>
        {/* <Shadow distance={4} offset={[1,1]} startColor={theme.colors.onSecondaryContainer} endColor={'#DADADA'}> 
          <Pressable onPress={handleChangeTime} style={styles.picker}>
            <Text >
              {time.getHours()} : {time.getMinutes()}
            </Text>
         </Pressable>
        </Shadow> */}
         <Pressable onPress={handleChangeTime} style={[styles.picker]}>
            <Text>
              {time.getHours()} : {time.getMinutes()}
            </Text>
         </Pressable>
       

        <DateTimePickerModal
          style={styles.activePicker}
          isVisible={isDatePickerVisible}
          mode="time"
          display="spinner"
          onConfirm={onChangeDate}
          onCancel={hideDatePicker}
          cancelTextIOS = {Strings.cancel}
          confirmTextIOS= {Strings.finish}
          minimumDate={new Date("2023-08-29T08:00:00.000Z")}
          maximumDate={new Date("2023-08-29T20:00:00.000Z")}
          locale="en_EN"
          textColor="black"
          is24Hour={true}
          date={time}
        />
      </View>
  );
};

export default SelectTime;

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