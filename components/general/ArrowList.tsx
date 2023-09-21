import React, { ReactNode, useState } from "react";
import { Pressable, View } from "react-native";
import LeftArrowSvg from "../svg/general/LeftArrowSvg";
import RightArrowSvg from "../svg/general/RightArrowSvg";
import SvgView from "./SvgView";

interface Input {
  itemsToDisplay: Array<ReactNode>;
}

const ArrowList = ({ itemsToDisplay }: Input) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const GoNextProfile = () => {
    setCurrentIndex((currentIndex + 1) % itemsToDisplay.length);
  };

  const GoPreviousProfile = () => {
    console.log("GO PREVIOUSLY");
    if (currentIndex == 0) {
      setCurrentIndex(itemsToDisplay.length - 1);
    } else {
      setCurrentIndex((currentIndex - 1) % itemsToDisplay.length);
    }
  };

  const numberOfElements = itemsToDisplay.length;

  return (
    <View style={{ flexDirection: "row" }}>
      {numberOfElements > 1 && (
        <Pressable onPress={GoPreviousProfile}>
          <SvgView size="small">
            <LeftArrowSvg></LeftArrowSvg>
          </SvgView>
        </Pressable>
      )}
      {numberOfElements > 0 && itemsToDisplay[currentIndex]}
      {numberOfElements > 1 && (
        <Pressable onPress={GoNextProfile}>
          <SvgView size="small">
            <RightArrowSvg></RightArrowSvg>
          </SvgView>
        </Pressable>
      )}
    </View>
  );
};

export default ArrowList;
