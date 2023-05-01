import React, { ReactNode } from "react";
import { Pressable, StyleSheet} from "react-native";

import {useTheme, Text} from 'react-native-paper'
import { scale } from "react-native-size-matters";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, parse } from "date-fns";

import { SpacingStyles } from '../../styles'
import Strings from './../../assets/strings'

interface timePickerInput {
  textAbovePicker: string,
  time: Date,
  onPress: Function
}

const SelectTime = ({textAbovePicker, time, onPress} : timePickerInput) => {
 
  const theme = useTheme();
  

  return (
         <Pressable onPress={() => onPress()} style={[SpacingStyles.selectTimeContainer, {backgroundColor: theme.colors.secondary}]}>
            <Text variant='bodyMedium' style={{fontWeight: 'bold'}}>
              {textAbovePicker}
            </Text>
            <Text>
              {format(time, "HH")} : {format(time, "mm")}
            </Text>
         </Pressable>
       

      
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