import React, { useState, useEffect} from 'react'
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';

import { useTheme, Text } from 'react-native-paper';
import { scale, verticalScale } from 'react-native-size-matters';

interface Params {
    text: string,
    callBack: Function,
    style?: ViewStyle,
    disabled?: boolean
}

interface ButtonSize {
    width: number,
    height: number
}

const Button = ({text, callBack, style, disabled} : Params) => {
    
    const [buttonSize, setButtonSize] = useState<ButtonSize>({width: 36, height: 154});
    const [fontDimension, setFontDimension] = useState<number>(12);

    const theme = useTheme();
    const baseHeight = 36;
    const baseWidth = 154;
    const baseFontSize = 16;

    useEffect(() => {
        setFontDimension(getFontSize());
    }, [buttonSize])

    const getFontSize = () => {
        const ratio = buttonSize.height / baseHeight;
        return baseFontSize * ratio;
    }

    const handleOnLayout = (layout) => {
        const {x, y, width, height} = layout;
        setButtonSize({width, height});
    }

    const getStyle = () => {
        if (style) return {...styles.button, ...style}
        else return styles.button;
    }

    const getTextColor = () =>{
        if(disabled === true)
            return theme.colors.onSurfaceDisabled
        else return theme.colors.onSecondary
    }

    const getButtonColor = () =>{
        if(disabled === true)
            return theme.colors.surfaceDisabled
        else return theme.colors.secondary
    }


    return(
        <TouchableOpacity style={[getStyle(), {backgroundColor: getButtonColor()}]} onLayout={(event) => handleOnLayout(event.nativeEvent.layout)} 
        onPress={() => !disabled && callBack()}>
            <Text style={{fontSize: scale(10), color: getTextColor()}}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 50, 
        paddingHorizontal: verticalScale(13),
        alignItems: 'center',
        justifyContent: 'center',
        margin: '3%'
    },
})

export default Button;

