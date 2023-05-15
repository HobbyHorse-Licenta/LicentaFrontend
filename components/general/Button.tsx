import React from 'react'
import {StyleSheet, ViewStyle } from 'react-native';

import { useTheme, Text, Button as PaperButton } from 'react-native-paper';

interface Params {
    text: string,
    onPress: Function,
    style?: ViewStyle,
    disabled?: boolean,
    textColor?: string,
    mode?: "text" | "outlined" | "contained" | "elevated" | "contained-tonal" | undefined,
}

const Button = ({text, onPress, style, disabled, mode, textColor} : Params) => {
    
    const theme = useTheme();

    const getStyle = () : ViewStyle => {
        let st;
        if (style)
        {
            st = {...styles.button, ...style}
        }
        else st = styles.button;

        if(disabled)
            return {...st, backgroundColor: theme.colors.onSurfaceDisabled}
        else return st;
    }
    
    return(
        <PaperButton textColor={textColor !== undefined ? textColor : undefined} mode={mode !== undefined ? mode :  "contained"} onPress={() => !disabled && onPress()} style={getStyle()}>
            <Text>{text}</Text>
        </PaperButton>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 50,
    },
})

export default Button;

