import React, { ReactNode } from "react";
import {View, ViewStyle, StyleSheet} from 'react-native'

import { useTheme, Text } from "react-native-paper";
import { scale, verticalScale } from "react-native-size-matters";
import { SpacingStyles } from "../../styles/SpacingStyles";
import {PAIRCOLORS} from '../../assets/colors/colors'

interface PrimaryContainerInput {
    children: ReactNode,
    styleInput?: ViewStyle,
    onPress: Function,
    index: number
}
const ScheduleContainer = ({children, styleInput, onPress, index} : PrimaryContainerInput) => {

    const theme = useTheme();
    return(
        <View style={[styles.wrapContainer]} onTouchEnd={() => onPress()}>
            <View style={[styles.textContainer, { backgroundColor: PAIRCOLORS[index % 5].main}, 
            styleInput ? styleInput : {padding: verticalScale(15)}]}>
                    {children}
            </View>
            <View style={[styles.coloredLine, {backgroundColor: PAIRCOLORS[index % 5].highlights}]}/>
        </View>
        
    );
}

export default ScheduleContainer;

const styles = StyleSheet.create({
    textContainer: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    coloredLine: {
        height: '100%', 
        width: '4%',
        position: 'absolute',
        left: 0
    },
    wrapContainer: {
        flexDirection: 'row',
        width: '100%',
        height: verticalScale(130),
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: scale(10)
    }
})