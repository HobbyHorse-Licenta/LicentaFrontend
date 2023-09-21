import React from "react";
import { Pressable } from "react-native";

import { useTheme, Text } from "react-native-paper";
import { format } from "date-fns";

import { SpacingStyles } from "../../styles";

interface timePickerInput {
  textAbovePicker: string;
  time: Date;
  onPress: Function;
}

const SelectTime = ({ textAbovePicker, time, onPress }: timePickerInput) => {
  const theme = useTheme();

  return (
    <Pressable
      onPress={() => onPress()}
      style={[
        SpacingStyles.selectTimeContainer,
        { backgroundColor: theme.colors.secondary },
      ]}
    >
      <Text variant="bodyMedium" style={{ fontWeight: "bold" }}>
        {textAbovePicker}
      </Text>
      <Text>
        {format(time, "HH")} : {format(time, "mm")}
      </Text>
    </Pressable>
  );
};

export default SelectTime;
