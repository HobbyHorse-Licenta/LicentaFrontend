import React, { useRef } from "react";
import { View, Text } from "react-native";

import * as Animatable from "react-native-animatable";

interface Input {
  text: string;
  textTravel?: number;
  duration?: number;
  color?: any;
  fontSize?: number;
}

const HorizontalTextScroll = ({
  text,
  textTravel,
  duration,
  color,
  fontSize,
}: Input) => {
  const animationRef = useRef(null);
  const durationInMiliseconds = duration !== undefined ? duration : 1;
  const runningWidth = textTravel !== undefined ? textTravel : 300;

  const slideInAndOut = {
    0: {
      left: -runningWidth,
    },
    1: {
      left: runningWidth,
    },
  };

  return (
    <Animatable.Text
      ref={animationRef}
      animation={slideInAndOut}
      iterationCount={Infinity}
      duration={durationInMiliseconds * 1000}
      easing={"linear"}
      style={[
        { fontSize: fontSize ? fontSize : 12 },
        color !== undefined && { color: color },
      ]}
    >
      {text}
    </Animatable.Text>
  );
};

export default HorizontalTextScroll;
