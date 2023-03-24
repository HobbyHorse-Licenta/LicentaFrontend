import React, { ReactNode, useState, useEffect } from "react";
import { Pressable, View, StyleSheet, ViewStyle } from "react-native";

import { useTheme, RadioButton, Text } from "react-native-paper";
import { scale, verticalScale } from "react-native-size-matters";

import { SpacingStyles } from "../../styles/SpacingStyles";
import PrimaryContainer from './PrimaryContainer';

interface Input {
    children: ReactNode,
    text?: string,
    onSelect: Function,
    onDeselect: Function,
    style?: ViewStyle,
    deselectTrigger?: number
}

const SelectionCard = ({children, onSelect, onDeselect, text, style, deselectTrigger}: Input) => {

    const [checked, setChecked] = useState(false);

    const theme = useTheme();

    useEffect(() => {
      setChecked(false);
    }, [deselectTrigger])
    
    const flipChecked = () => 
    {
        if(checked)
        {
            setChecked(false);
            onDeselect();
        }
        else {
            setChecked(true);
            onSelect();
        }
    }

    const getStyle = () => {
        if(style)
            return {...SpacingStyles.shadow, ...styles.optionTile, ...style}
        else return {...SpacingStyles.shadow, ...styles.optionTile}
    }

    return(
        <Pressable onPress={flipChecked}>
            <PrimaryContainer styleInput={getStyle()}>
                {children}
                <View style={styles.radioButtonContainer}>
                    {checked && 
                        <RadioButton
                            value="smth"
                            onPress={flipChecked}
                            status={ checked ? 'checked' : 'unchecked'}
                            color={theme.colors.tertiary}
                            uncheckedColor={theme.colors.tertiary}    
                        />
                    }
                    {text != undefined && <Text variant='bodyMedium'>{text}</Text>}
                </View>
            </PrimaryContainer>
        </Pressable>
    );
};

export default SelectionCard;

const styles = StyleSheet.create({
    optionTile: {
        height: verticalScale(230),
        width: scale(150),
        margin: scale(10),
        padding: scale(20),
    },
    radioButtonContainer: {
        position: 'absolute',
        bottom: verticalScale(10),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});