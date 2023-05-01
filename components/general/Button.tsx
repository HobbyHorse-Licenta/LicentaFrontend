import React, { useState, useEffect} from 'react'
import { TouchableOpacity, StyleSheet, ViewStyle, Pressable } from 'react-native';

import { useTheme, Text, Button as PaperButton } from 'react-native-paper';
import { scale, verticalScale } from 'react-native-size-matters';

interface Params {
    text: string,
    onPress: Function,
    style?: ViewStyle,
    disabled?: boolean,
    mode?: "text" | "outlined" | "contained" | "elevated" | "contained-tonal" | undefined,
}

interface ButtonSize {
    width: number,
    height: number
}

const Button = ({text, onPress, style, disabled, mode} : Params) => {
    
    const theme = useTheme();

    const getStyle = () : ViewStyle => {
        let st;
        if (style) st = {...styles.button, ...style}
        else st = styles.button;

        if(disabled)
            return {...st, backgroundColor: theme.colors.onSurfaceDisabled}
        else return {...st, backgroundColor: theme.colors.secondary}
    }

    return(
        <PaperButton mode={mode} onPress={() => !disabled && onPress()} style={[getStyle()]}>
            <Text>{text}</Text>
        </PaperButton>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 50, 
        paddingHorizontal: verticalScale(13),
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default Button;

