import { get } from "immer/dist/internal";
import React, { ReactNode } from "react";
import {View, ViewStyle} from 'react-native'

import { useTheme } from "react-native-paper";
import { verticalScale } from "react-native-size-matters";
import { SpacingStyles } from "../../styles/SpacingStyles";

interface PrimaryContainerInput {
    children: ReactNode,
    styleInput?: ViewStyle
}
const PrimaryContainer = ({children, styleInput} : PrimaryContainerInput) => {

    const getStyle = () => {
        if(styleInput != undefined)
            return {...SpacingStyles.primaryContainer, ...{backgroundColor: theme.colors.primary, padding: verticalScale(15)}, ...styleInput}
        else return {...SpacingStyles.primaryContainer, ...{backgroundColor: theme.colors.primary, padding: verticalScale(15)}}
    }
    const theme = useTheme();
    return(
        // <View style={[SpacingStyles.primaryContainer, { backgroundColor: theme.colors.primary}, 
        //                                         styleInput ? styleInput : {padding: verticalScale(15)}]}>
        //     {children}
        // </View>
        <View style={getStyle()}>
            {children}
        </View>
    );
}

export default PrimaryContainer;