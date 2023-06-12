import React from "react";
import { Text } from "react-native-paper";

import { format, parse } from "date-fns";

import {Schedule} from '../../types';
import { SelectedDaysDisplay } from "../general";
import ScheduleContainer from "./ScheduleContainer";

interface ScheduleElementInput {
    schedule: Schedule,
    onPress?: Function,
    onDelete?: (scheduleIndex: number) => void,
    onUpdate?: (scheduleIndex: number) => void,
    index: number
}

const ScheduleElement = ({schedule, onPress, index, onDelete, onUpdate} : ScheduleElementInput) => {


    return (
        <ScheduleContainer onDelete={onDelete} onUpdate={onUpdate} onPress={() => onPress !== undefined && onPress()} index={index}>
            <SelectedDaysDisplay selectedDays={schedule.days}></SelectedDaysDisplay>
            <Text>{format(schedule.startTime, "HH")}:{format(schedule.startTime, "mm")}
            -{format(schedule.endTime, "HH")}:{format(schedule.endTime, "mm")}</Text>
            
            <Text>Age: {schedule.minimumAge}-{schedule.maximumAge}</Text>
            <Text>Gender: {schedule.gender}</Text>
            <Text>Max nr of partners: {schedule.maxNumberOfPeople}</Text>
        </ScheduleContainer>
    );
};

export default ScheduleElement;