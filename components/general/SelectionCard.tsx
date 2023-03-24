import React, { ReactNode, useState, useEffect } from "react";
import { Pressable, View, StyleSheet, ViewStyle } from "react-native";

import { useTheme, RadioButton, Text } from "react-native-paper";
import { scale, verticalScale } from "react-native-size-matters";

import { SpacingStyles } from "../../styles/SpacingStyles";
import PrimaryContainer from './PrimaryContainer';

interface Input {
    children: ReactNode,
    text?: string,
    selectState: boolean
    onSelect?: Function,
    onDeselect?: Function,
    style?: ViewStyle,
    flipSelectState: Function
}

const SelectionCard = ({children, onSelect, onDeselect, text, style, flipSelectState, selectState}: Input) => {

    const theme = useTheme();
    
    const flipChecked = () => 
    {
        if(selectState == true)
        {
            if(onDeselect != undefined)
                onDeselect();
        }
        else {
            if(onSelect != undefined)
                onSelect();
        }
        flipSelectState();
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
                    {selectState && 
                        <RadioButton
                            value="smth"
                            onPress={flipChecked}
                            status={ selectState ? 'checked' : 'unchecked'}
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