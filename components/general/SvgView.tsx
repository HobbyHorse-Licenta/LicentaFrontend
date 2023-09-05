import React, { ReactNode } from "react";
import { Pressable, TextStyle, View, ViewStyle } from "react-native";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";

import { useTheme } from "react-native-paper";

import { SpacingStyles } from "../../styles";


interface SvgViewInput {
    onPress?:  Function,
    children: ReactNode,
    style?: ViewStyle | TextStyle,
    size: 'tiny' | 'small' | 'medium' | 'big' | 'very large' | 'wrappable'
} 



const SvgView = ({children, onPress, style, size}: SvgViewInput, {copilot}) => {

    const getStyle = () => {
        let s;
        switch (size) {
            case 'tiny':
                s = [SpacingStyles.tinyIcon, style];
            break;
            case 'small':
                s = [SpacingStyles.smallIcon, style];
            break;
            case 'medium':
                s = [SpacingStyles.mediumIcon, style];
            break;
            case 'big':
                s = [SpacingStyles.bigIcon, style];
            break;
            case 'very large':
                s = [SpacingStyles.veryLargeIcon, style];
            break;
            case 'very large':
                s = [SpacingStyles.wrappableIcon, style];
            break;
            default:
                s = [SpacingStyles.smallIcon, style];
            break;
        }
        if(style != undefined)
        {
            s = [...s, style];
        }
        
        return s;
    }

    const theme = useTheme();

    return (
        <View style={getStyle()} {...copilot}>
        <TouchableWithoutFeedback onPressOut={() => (onPress !== undefined) ? onPress() : console.log("[SvgView]: No action on press")}>
            {children}
        </TouchableWithoutFeedback>
        </View>
        
    );
};


export default SvgView;