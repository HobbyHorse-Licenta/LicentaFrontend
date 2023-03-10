import React from "react";
import { Platform, View } from "react-native";

import { useTheme } from "react-native-paper";

import { SpacingStyles } from "../../styles";
import { PrimaryContainer } from "../general";
import SelectTimeAndroid from './SelectTimeAndroid';
import SelectTimeIos from './SelectTimeIos';

const SelectHourRange = () => {

    const theme = useTheme()
    return(
      <PrimaryContainer>
        {   
        Platform.OS === "android" ?
        ( 
          <View style={[SpacingStyles.centeredContainer, {flexDirection: 'row'}]}>
            <SelectTimeAndroid textAbovePicker="Start time"></SelectTimeAndroid>
            <SelectTimeAndroid textAbovePicker="End time"></SelectTimeAndroid>
          </View>
        ):
        (
          <View style={[SpacingStyles.centeredContainer, {flexDirection: 'row'}]}>
            <SelectTimeIos textAbovePicker="Start time"></SelectTimeIos>
            <SelectTimeIos textAbovePicker="End time"></SelectTimeIos>
          </View>
        )
        }
      </PrimaryContainer>
    );
};

export default SelectHourRange;