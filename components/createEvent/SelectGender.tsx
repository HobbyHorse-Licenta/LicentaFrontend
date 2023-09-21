import React from "react";
import { Pressable, View, StyleSheet } from "react-native";

import { Text, useTheme } from "react-native-paper";
import { scale } from "react-native-size-matters";

import { Gender } from "../../types";
import { SvgView } from "../general";
import { FemaleSvg, MaleAndFemaleSvg, MaleSvg } from "../svg/general";

interface Input {
  gender: Gender | undefined;
  onGenderChange: (gender: Gender | undefined) => void;
}
const SelectGender = ({ gender, onGenderChange }: Input) => {
  const theme = useTheme();

  const selectedFemale = () => {
    if (gender === Gender.Female) {
      onGenderChange(undefined);
    } else {
      onGenderChange(Gender.Female);
    }
  };

  const selectedMale = () => {
    if (gender === Gender.Male) {
      onGenderChange(undefined);
    } else {
      onGenderChange(Gender.Male);
    }
  };

  const selectedMixed = () => {
    if (gender === Gender.Mixed) {
      onGenderChange(undefined);
    } else {
      onGenderChange(Gender.Mixed);
    }
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <Pressable onPress={selectedFemale}>
        <View
          style={[
            styles.iconWithLabel,
            gender === Gender.Female && {
              backgroundColor: theme.colors.tertiary,
            },
          ]}
        >
          <SvgView size="big">
            <FemaleSvg></FemaleSvg>
          </SvgView>
          <Text>Female</Text>
        </View>
      </Pressable>
      <Pressable onPress={selectedMale}>
        <View
          style={[
            styles.iconWithLabel,
            gender === Gender.Male && {
              backgroundColor: theme.colors.tertiary,
            },
          ]}
        >
          <SvgView size="big">
            <MaleSvg></MaleSvg>
          </SvgView>
          <Text>Male</Text>
        </View>
      </Pressable>
      <Pressable onPress={selectedMixed}>
        <View
          style={[
            styles.iconWithLabel,
            gender === Gender.Mixed && {
              backgroundColor: theme.colors.tertiary,
            },
          ]}
        >
          <SvgView size="big">
            <MaleAndFemaleSvg></MaleAndFemaleSvg>
          </SvgView>
          <Text>Mixed</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default SelectGender;

const styles = StyleSheet.create({
  iconWithLabel: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "white",
    padding: scale(10),
    margin: scale(10),
  },
});
