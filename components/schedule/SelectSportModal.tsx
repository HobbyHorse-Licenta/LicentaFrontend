import React, {useState, useEffect} from "react";
import { ScrollView, TouchableWithoutFeedback, View } from "react-native";

import { Text } from "react-native-paper";
import { scale, verticalScale } from "react-native-size-matters";

import { GeneralModal, SportTile, SportTileWithoutFeedback } from "../general";
import { SportName } from "../../types";

interface ModalInput {
    visible: boolean,
    onDismiss: Function,
    onSelect: Function
}

const SelectSportModal = ({visible, onDismiss, onSelect} : ModalInput) => {

    const getEnumFromString = (value: string) =>
    {
        switch(value) {
            case SportName.Basketball:
              return SportName.Basketball;
            case SportName.Biliard:
                return SportName.Biliard;
            case SportName.Bowling:
                return SportName.Bowling;
            case SportName.Hiking:
                return SportName.Hiking;
            case SportName.Ping_Pong:
                return SportName.Ping_Pong;
            case SportName.Tennis:
                return SportName.Tennis;
            default:
              return SportName.Basketball;
        }
    }
    
    const getOptions = () => {
        const keys = Object.values(SportName);

        return keys.map((sportName, index) => {
            return(
                <View key={index}>
                    {index !== 0 ? <View style={{backgroundColor: 'lightgrey', width: '100%', height: 1}}></View> : <View></View>}
                    <TouchableWithoutFeedback onPress={() => onSelect(sportName)}>
                        <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', alignItems: 'center', marginVertical: verticalScale(5)}}>
                            <SportTileWithoutFeedback sport={sportName} onLongPress={() => console.log("[SelectSportModal]: nothing")} ></SportTileWithoutFeedback>
                            <Text style={{margin: scale(10)}}>{sportName}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    
                </View>
                

            );
        });
    };
    

    return(
        <GeneralModal visible={visible} onDismiss={() => onDismiss()}>
            <ScrollView>
              { getOptions() }
            </ScrollView>
        </GeneralModal>
    );
};

export default SelectSportModal;