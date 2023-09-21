import React from "react";
import { View, StyleSheet } from "react-native";

import { Text } from "react-native-paper";
import { scale } from "react-native-size-matters";
import { COLORS } from "../../assets/colors/colors";

import Button from "./Button";
import GeneralModal from "./GeneralModal";

interface Input {
  visible: boolean;
  onDismiss: Function;
  question: string;
  onButton1Press: Function;
  button1Text?: string;
  onButton2Press?: Function;
  button2Text?: string;
  buttonsColor?: string;
}

const QuestionModal = ({
  visible,
  onDismiss,
  question,
  onButton1Press,
  button1Text,
  onButton2Press,
  button2Text,
  buttonsColor,
}: Input) => {
  const buttonColor =
    buttonsColor !== undefined ? buttonsColor : COLORS.aBackground;
  return (
    <GeneralModal visible={visible} onDismiss={onDismiss}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.question}>{question}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Button
            style={{ ...styles.button, backgroundColor: buttonColor }}
            text={button1Text !== undefined ? button1Text : "No description"}
            onPress={onButton1Press}
          ></Button>
          {onButton2Press !== undefined && (
            <Button
              style={{ ...styles.button, backgroundColor: buttonColor }}
              text={button2Text !== undefined ? button2Text : "No description"}
              onPress={onButton2Press}
            ></Button>
          )}
        </View>
      </View>
    </GeneralModal>
  );
};

export default QuestionModal;

const styles = StyleSheet.create({
  question: {
    margin: scale(20),
  },
  button: {
    margin: scale(10),
  },
});
