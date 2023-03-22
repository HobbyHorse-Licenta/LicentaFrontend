import React, { useState, useEffect } from 'react'
import { View, ScrollView} from 'react-native';

import { Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { Fetch } from '../../services';
import { SpacingStyles } from '../../styles';
import { Schedule } from '../../types';
import ScheduleElement from './ScheduleElement';
import AddScheduleElement from './AddScheduleElement';
import { useSelector } from 'react-redux';

const MySchedulesBody = () => {

    const navigation = useNavigation();

    const [schedules, setSchedules] = useState<Array<Schedule>>([]);

    const theme = useTheme();

    const {mySchedules} = useSelector((state: any) => state.appState);

    useEffect(() => {
     setSchedules(mySchedules); 
    }, [mySchedules])
    
    return(
        <View style={[SpacingStyles.fullSizeContainer, SpacingStyles.centeredContainer, {padding: '5%', backgroundColor: theme.colors.background}]}>
            <AddScheduleElement onPress={() => navigation.navigate('Schedule' as never)}/>
            {
                (schedules != undefined && schedules.length > 0) ? (
                    <ScrollView style={{margin: '3%'}}>
                        {schedules.map((sch, index) => {
                            return(
                                <ScheduleElement index={index} onPress={() => navigation.navigate('Schedule' as never)} key={sch.id} schedule={sch}/>
                            );
                        })}
                    </ScrollView>
                ):(
                    <View>
                    </View>
                )
            }
        </View>
    );
};

export default MySchedulesBody;


