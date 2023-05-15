import { nothing } from "immer";
import React, { ReactNode, useState } from "react";
import {View, ViewStyle, StyleSheet, Pressable} from 'react-native'

import { useTheme, Text } from "react-native-paper";
import { scale, verticalScale } from "react-native-size-matters";
import {PAIRCOLORS} from '../../assets/colors/colors'
import { SpacingStyles } from "../../styles";
import { Button, SvgView } from "../general";
import { DeleteSvg } from "../svg/general";

interface PrimaryContainerInput {
    children: ReactNode,
    styleInput?: ViewStyle,
    onPress?: Function,
    onDelete?: Function
    index: number
}
const ScheduleContainer = ({children, styleInput, onPress, index, onDelete} : PrimaryContainerInput) => {

    const [svgSize, setSvgSize] = useState(50);
    const [deletable, setDeletable] = useState(false);
    const [height, setHeight] = useState(0);
    const theme = useTheme();
    let timeoutId;

    const makeDeletable = () => {
        setDeletable(true);
        timeoutId = setTimeout(() => {
            setDeletable(false);
        }, 4000);
    }

    const deleteSchedule = () => {
        if(onDelete !== undefined)
        {
            onDelete(index);
            clearTimeout(timeoutId);
            setDeletable(false);
        }
    }

    return(
        <View style={{position: "relative"}}>
            <Pressable onPress={() => onPress !== undefined && onPress()}
                onLongPress={() => makeDeletable()}>
                <View onLayout={(event) => setHeight(event.nativeEvent.layout.height)} 
                style={[styles.scheduleContainer, { backgroundColor: PAIRCOLORS[index % 5].main}, styleInput !== undefined && styleInput]}
                >
                    {/* <Button textColor={'red'} text="Delete" style={{width: scale(100)}} onPress={() => nothing}/> */}
                    {
                        deletable === true && onDelete !== undefined &&
                        <Pressable onPress={deleteSchedule}>
                            <Text style={[styles.deleteText, {alignSelf: 'flex-end', color: theme.colors.tertiary}]}>Delete</Text>
                        </Pressable>
                    }
                    <View style={[SpacingStyles.centeredContainer, {alignSelf: 'center'}]}>
                        {children}
                    </View> 
                </View>
            </Pressable>
            <View style={[styles.coloredLine, {height: height, backgroundColor: PAIRCOLORS[index % 5].highlights}]}/>   
        </View>
    );
}

export default ScheduleContainer;

const styles = StyleSheet.create({
    deleteText: {
        left: 0,
        top: 0,
        padding: scale(5)
    },
    coloredLine: {
        width: '2%',
        position: 'absolute',
        left: 0
    },
    scheduleContainer: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        marginLeft: scale(10),
        padding: scale(10),
      },
})