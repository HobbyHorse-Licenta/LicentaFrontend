import React, { ReactNode } from "react";
import { Pressable, TextStyle, View, ViewStyle } from "react-native";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";

import { useTheme } from "react-native-paper";

import { SpacingStyles } from "../../styles";


// type CustomStyle = ViewStyle & {
//     : string;
//   };

interface SvgViewInput {
    onPress?:  Function,
    children: ReactNode,
    style?: ViewStyle | TextStyle,
    size: 'tiny' | 'small' | 'medium' | 'big'
} 



const SvgView = ({children, onPress, style, size}: SvgViewInput) => {

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
        <View style={getStyle()}>
        <TouchableWithoutFeedback  onPress={() => (onPress != undefined) ? onPress() : console.log("[SvgView]: No action on press")}>
            {children}
        </TouchableWithoutFeedback>
        </View>
        
    );
};


export default SvgView;