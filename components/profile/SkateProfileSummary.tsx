import React, { useState } from "react";
import { Pressable } from "react-native";

import { nothing } from "immer";
import { Text, useTheme } from "react-native-paper";

import { SpacingStyles } from "../../styles";
import { SkateProfile } from "../../types";
import { PrimaryContainer } from "../general";
import { uiUtils } from "../../utils";

interface Input {
  info: SkateProfile;
  selected: boolean;
  onLongPress?: Function;
  onPress?: Function;
}

const SkateProfileSummary = ({
  info,
  selected,
  onLongPress,
  onPress,
}: Input) => {
  const [heldDown, setHeldDown] = useState(false);

  const getStyle = () => {
    if (selected === true) {
      return {
        ...SpacingStyles.skateProfileSummary,
        ...{
          backgroundColor:
            heldDown === false
              ? theme.colors.tertiary
              : uiUtils.darkenColor(theme.colors.tertiary, 10),
          borderColor: theme.colors.tertiary,
        },
      };
    } else {
      return {
        ...SpacingStyles.skateProfileSummary,
        ...{
          backgroundColor:
            heldDown === false
              ? theme.colors.background
              : uiUtils.darkenColor(theme.colors.background, 10),
          borderColor: theme.colors.tertiary,
        },
      };
    }
  };
  const theme = useTheme();
  return (
    <Pressable
      onTouchStart={() => setHeldDown(true)}
      onTouchEnd={() => setHeldDown(false)}
      onLongPress={() => (onLongPress !== undefined ? onLongPress() : nothing)}
      onPress={() => (onPress !== undefined ? onPress() : nothing)}
    >
      <PrimaryContainer styleInput={getStyle()}>
        <Text variant="labelSmall">{info.skateType}</Text>
        <Text variant="labelSmall">{info.skatePracticeStyle}</Text>
        <Text variant="labelSmall">{info.skateExperience}</Text>
      </PrimaryContainer>
    </Pressable>
  );
};

export default SkateProfileSummary;
