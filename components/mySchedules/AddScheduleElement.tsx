import { sparseArrayEquality } from "@jest/expect-utils";
import React from "react";
import { TouchableOpacity, TouchableWithoutFeedbackComponent, View} from "react-native";

import { Text } from "react-native-paper";
import { scale, verticalScale } from "react-native-size-matters";
import { SpacingStyles } from "../../styles";

import { PrimaryContainer } from "../general";
import { PlusSvg } from "../svg/general";

interface Input {
    onPress: Function
}

const AddScheduleElement = ({onPress} : Input) =>
{
    return (
        <PrimaryContainer styleInput={SpacingStyles.scheduleContainer}>
            <TouchableOpacity style={[SpacingStyles.centeredContainer, SpacingStyles.fullSizeContainer]} onPress={() => onPress()}>
                {/* <Text>Add new schedule</Text> */}
                <View style={{width: scale(100), height: verticalScale(100)}}>
                    <PlusSvg></PlusSvg>
                </View>
                
                
            </TouchableOpacity>
        </PrimaryContainer>
       
    );
}

export default AddScheduleElement;