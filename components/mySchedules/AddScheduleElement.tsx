import React from "react";
import { TouchableOpacity, TouchableWithoutFeedbackComponent, View} from "react-native";

import { Text } from "react-native-paper";
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
            <TouchableOpacity onPress={() => onPress()}>
                <Text>Add new schedule</Text>
            </TouchableOpacity>
        </PrimaryContainer>
       
    );
}

export default AddScheduleElement;