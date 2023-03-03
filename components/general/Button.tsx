import React, { useState, useEffect} from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native';

import { useTheme, Text } from 'react-native-paper';

interface Params {
    text: string,
    callBack: Function
}

interface ButtonSize {
    width: number,
    height: number
}

const Button = ({text, callBack} : Params) => {
    
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

    return(
    <TouchableOpacity style={[styles.button, {backgroundColor: theme.colors.secondary}]} onLayout={(event) => handleOnLayout(event.nativeEvent.layout)}  onPress={() => callBack()}>
        <Text style={{fontSize: fontDimension, color: theme.colors.onSecondary}}>{text}</Text>
    </TouchableOpacity>
   
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 50, 
        minHeight: 25,
        minWidth: 40,
        maxHeight: 80,
        maxWidth: 300, 
        padding: '3%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '3%'
    },
})

export default Button;

