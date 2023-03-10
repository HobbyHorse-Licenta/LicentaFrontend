import React, { PropsWithChildren, ReactNode } from "react";
import { View, ViewStyle } from "react-native";

import { useTheme } from "react-native-paper";

import { SpacingStyles } from "../../styles";

interface SvgViewInput {
    onTouchEnd?:  Function,
    children: ReactNode,
    style: ViewStyle,
} 

const SvgView = ({children, onTouchEnd, style}: SvgViewInput) => {

    const getStyle = () => {
        if(style != undefined)
            return [SpacingStyles.smallIcon, style];
        return [SpacingStyles.smallIcon];
    }

    const theme = useTheme();

    return (
        <View onTouchEnd={() => (onTouchEnd != undefined) ? onTouchEnd() : console.log("[SvgView]: No action on press")} 
        style={getStyle()}>
            {children}
        </View>
    );
};

export default SvgView;