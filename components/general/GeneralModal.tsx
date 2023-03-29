import React, { ReactNode } from "react";
import { Dimensions, StyleSheet, Modal, View, Text, Pressable } from "react-native";

import { Portal, Provider } from 'react-native-paper';
import OutsidePressHandler from 'react-native-outside-press';
import { scale, verticalScale } from "react-native-size-matters";

const screenWidth = Dimensions.get('screen').width;

interface ModalInput {
    visible: boolean,
    onDismiss: Function,
    backgroundColor?: string
    width?: number,
    height?: number,
    children: ReactNode
}

// const ModalHeight = verticalScale(400);
// const ModalWidth = verticalScale(230);

const GeneralModal = ({visible, onDismiss, backgroundColor, children} : ModalInput) => {


    const returnLeftAlignValue = (value: number) => {
        const shiftsToLeftMargin = -(screenWidth/2) //shift the modal so that it touches the left screen margin
        return value + shiftsToLeftMargin;
    }

    const returnTopAlignValue = (value: number) => {
        const shiftsToLeftMargin = -(screenWidth/2) //shift the modal so that it touches the left screen margin
        return 0;
    }

    const containerStyle = {backgroundColor: backgroundColor ? backgroundColor : 'white', padding: scale(20)};

    return(
        // <Provider>
        //     <Portal>
        //         <Modal visible={visible} onDismiss={() => console.log("INCHEIEM")} contentContainerStyle={containerStyle} 
        //         style={[styles.modal, {left: returnLeftAlignValue((screenWidth- ModalWidth)/2), top: returnTopAlignValue((screenWidth- ModalHeight)/2)}]}>
        //             {children}
        //         </Modal>
        //     </Portal>
        // </Provider>
        <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          console.log('Modal has been closed.');
          onDismiss();
        }}>
        <View style={styles.centeredView}>
            <OutsidePressHandler
                onOutsidePress={() => {
                    onDismiss();
                }}
                disabled={false}
                >
                <View style={styles.modalView}>
                    {children}
                 </View>
            </OutsidePressHandler>
        </View>
      </Modal>
    );
}

export default GeneralModal;

const styles = StyleSheet.create({
    modal: {
        borderRadius: 20,
        position: 'absolute'
    },
    centeredView: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        padding: scale(20),
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
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
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });
  