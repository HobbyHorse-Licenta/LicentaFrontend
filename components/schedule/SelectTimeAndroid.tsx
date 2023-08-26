import React, { useState } from "react";
import { View} from "react-native";

import RNDateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

import { SelectTime } from "../general";

interface timePickerInput {
  textAbovePicker: string,
  time: Date
  setTime: Function
}

const SelectTimeAndroid = ({textAbovePicker, time, setTime} : timePickerInput) => {

  const [dataPickerVisible, setDatePickerVisible] = useState(false);

  return (
    <View>
      <SelectTime textAbovePicker={textAbovePicker} time={time} onPress={() => setDatePickerVisible(true)}/>
      {/* {dataPickerVisible === true && 
      <RNDateTimePicker onChange={(time) => {
        if(time.nativeEvent.timestamp !== undefined)
        {
          setTime(new Date(time.nativeEvent.timestamp));
        }
        setDatePickerVisible(false);
      }} mode='time'  value={time} minimumDate={new Date(1950, 0, 1)} maximumDate={new Date(2023,0,1)} />
      } */}
    </View>
  );
};

export default SelectTimeAndroid;