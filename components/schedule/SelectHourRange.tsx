import React from "react";
import { Platform, View } from "react-native";

import { useTheme } from "react-native-paper";

import { SpacingStyles } from "../../styles";
import { SelectTime, SelectTimeAndroid } from '../schedule';

const SelectHourRange = () => {

    const theme = useTheme()
    return(
         <View style={[SpacingStyles.containerInsideSchedule , {backgroundColor: theme.colors.primary}]}>
            {   
            Platform.OS === "android" ?
            ( 
              <View style={[SpacingStyles.centeredContainer, {flex: 1, flexDirection: 'row'}]}>
                <SelectTimeAndroid textAbovePicker="Start time"></SelectTimeAndroid>
                <SelectTimeAndroid textAbovePicker="End time"></SelectTimeAndroid>
              </View>
            ):
            (
              <View style={[SpacingStyles.centeredContainer, {flex: 1, flexDirection: 'row'}]}>
                <SelectTime textAbovePicker="Start time"></SelectTime>
                <SelectTime textAbovePicker="End time"></SelectTime>
              </View>
            )
            }
        </View>
    );
};

export default SelectHourRange;