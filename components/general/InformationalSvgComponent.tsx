import React, { ReactNode } from "react";
import { View } from "react-native";

import { Text } from "react-native-paper";
import { scale } from "react-native-size-matters";

import PrimaryContainer from "./PrimaryContainer";

interface InformationalSvgComponentInput {
  headline: string;
  body: string;
  svgElement: ReactNode;
}
const InformationalSvgComponent = ({
  headline,
  body,
  svgElement,
}: InformationalSvgComponentInput) => {
  return (
    <PrimaryContainer
      styleInput={{ marginVertical: scale(20), paddingTop: scale(50) }}
    >
      <Text style={{ textAlign: "center" }} variant="headlineSmall">
        {headline}
      </Text>
      <Text
        style={{ textAlign: "center", marginTop: scale(7) }}
        variant="bodySmall"
      >
        {body}
      </Text>
      <View style={{ height: 250, width: 300 }}>{svgElement}</View>
    </PrimaryContainer>
  );
};

export default InformationalSvgComponent;
