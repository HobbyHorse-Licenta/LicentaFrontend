import React from "react";
import { Text } from "react-native-paper";

import {Schedule} from '../../types';
import ScheduleContainer from "./ScheduleContainer";

interface ScheduleElementInput {
    schedule: Schedule,
    onPress: Function,
    index: number
}

const ScheduleElement = ({schedule, onPress, index} : ScheduleElementInput) => {
    return (
        <ScheduleContainer onPress={() => onPress()} index={index}>
            <Text>3 Days</Text>
            <Text>Range:</Text>
            <Text>12:00-15:40</Text>
        </ScheduleContainer>
    );
};

export default ScheduleElement;