import React, { useState } from "react";
import { View } from "react-native";

import DropDownPicker from "react-native-dropdown-picker";
import { scale } from "react-native-size-matters";
import { useTheme, Text } from "react-native-paper";
import { SpacingStyles } from "../../styles";

interface Input {
  minimumAge: number | null;
  maximumAge: number | null;
  onMinimumAgeChange: React.Dispatch<React.SetStateAction<number | undefined>>;
  onMaximumAgeChange: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const SelectAgeGap = ({
  onMinimumAgeChange,
  onMaximumAgeChange,
  minimumAge,
  maximumAge,
}: Input) => {
  const minAge = 12;
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(
    Array.from({ length: 80 }, (_, i) => {
      return { label: (i + minAge).toString(), value: i + minAge };
    })
  );

  const [open2, setOpen2] = useState(false);
  const [items2, setItems2] = useState(
    Array.from({ length: 80 }, (_, i) => {
      return { label: (i + minAge).toString(), value: i + minAge };
    })
  );

  const theme = useTheme();

  return (
    <View style={[{ flexDirection: "row" }, SpacingStyles.centeredContainer]}>
      <DropDownPicker
        listMode="SCROLLVIEW"
        placeholder="Min age"
        containerStyle={{ width: scale(100) }}
        textStyle={{
          fontSize: scale(14),
        }}
        labelStyle={{
          fontWeight: "bold",
          color: theme.colors.tertiary,
        }}
        open={open}
        value={minimumAge}
        items={items}
        setOpen={setOpen}
        setValue={onMinimumAgeChange}
        setItems={setItems}
        onChangeValue={val1 => {
          if (val1 !== null && maximumAge !== null && maximumAge < val1) {
            onMaximumAgeChange(val1);
          }
        }}
        zIndex={2}
        autoScroll={true}
      />
      <Text style={{ marginHorizontal: scale(10) }}>to</Text>
      <DropDownPicker
        zIndex={2}
        listMode="SCROLLVIEW"
        placeholder="Max age"
        containerStyle={{ width: scale(100) }}
        textStyle={{
          fontSize: scale(14),
        }}
        labelStyle={{
          fontWeight: "bold",
          color: theme.colors.tertiary,
        }}
        autoScroll={true}
        open={open2}
        value={maximumAge}
        items={items2}
        setOpen={setOpen2}
        setValue={onMaximumAgeChange}
        onChangeValue={val2 => {
          if (val2 != null) {
            if (minimumAge !== null) {
              if (val2 < minimumAge) {
                onMaximumAgeChange(minimumAge);
              } else {
                onMaximumAgeChange(val2);
              }
            } else {
              onMaximumAgeChange(val2);
            }
          }
        }}
        setItems={setItems2}
      />
    </View>
  );
};

export default SelectAgeGap;
