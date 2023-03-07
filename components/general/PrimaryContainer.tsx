import React from "react";
import {View, ViewStyle} from 'react-native'

import { useTheme } from "react-native-paper";
import { SpacingStyles } from "../../styles/SpacingStyles";

interface PrimaryContainerInput {
    children: any,
    styleInput?: ViewStyle
}
const PrimaryContainer = ({children, styleInput} : PrimaryContainerInput) => {

    const theme = useTheme();
    return(
        <View style={[SpacingStyles.primaryContainer, { backgroundColor: theme.colors.primary}, styleInput]}>
            {children}
        </View>
    );
}

export default PrimaryContainer;