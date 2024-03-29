import React, { ReactNode } from "react";
import { StyleSheet, Modal, View } from "react-native";

import OutsidePressHandler from "react-native-outside-press";
import { scale } from "react-native-size-matters";

interface ModalInput {
  visible: boolean;
  onDismiss?: Function;
  backgroundColor?: string;
  width?: number;
  height?: number;
  children: ReactNode;
}

const GeneralModal = ({ visible, onDismiss, children }: ModalInput) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        console.log("Modal has been closed.");
        onDismiss !== undefined && onDismiss();
      }}
    >
      <View style={styles.centeredView}>
        <OutsidePressHandler
          onOutsidePress={() => {
            onDismiss !== undefined && onDismiss();
          }}
          disabled={false}
        >
          <View style={styles.modalView}>{children}</View>
        </OutsidePressHandler>
      </View>
    </Modal>
  );
};

export default GeneralModal;

const styles = StyleSheet.create({
  modal: {
    borderRadius: 20,
    position: "absolute",
  },
  centeredView: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    padding: scale(20),
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
