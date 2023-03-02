import React, { useState } from "react";
import { Pressable, View, Button, Text} from "react-native";

import { SafeAreaView } from "react-navigation";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { SpacingStyles } from '../../styles'

const SelectTime = () => {

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [time, setTime] = useState<Date>(new Date())
 
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
    <SafeAreaView style={SpacingStyles.container}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Pressable onPress={handleChangeTime}>
          <Text >
           {time.getHours()} : {time.getMinutes()}
          </Text>
        </Pressable>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          display="spinner"
          onConfirm={onChangeDate}
          onCancel={hideDatePicker}
          locale="en_EN"
          is24Hour={true}
          date={time}
        />
      </View>
    </SafeAreaView>
  );
};

export default SelectTime;