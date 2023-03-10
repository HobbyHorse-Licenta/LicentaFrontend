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

    const theme = useTheme();
    return(
        <View style={[SpacingStyles.primaryContainer, { backgroundColor: theme.colors.primary}, 
                                                styleInput ? styleInput : {padding: verticalScale(15)}]}>
            {children}
        </View>
    );
}

export default PrimaryContainer;