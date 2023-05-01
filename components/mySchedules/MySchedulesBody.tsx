import React, { useState, useEffect } from 'react'
import { View, ScrollView} from 'react-native';

import { Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { Fetch } from '../../services';
import { SpacingStyles } from '../../styles';
import { Schedule } from '../../types';
import ScheduleElement from './ScheduleElement';
import AddScheduleElement from './AddScheduleElement';
import { useDispatch, useSelector } from 'react-redux';
import { SkateProfiles } from '../profile';
import { RootState } from '../../redux/store';
import { setCurrentSkateProfile } from '../../redux/appState';

const MySchedulesBody = () => {

    const navigation = useNavigation();
    const {currentSkateProfile, user} = useSelector((state: RootState) => state.appState)

    const [schedules, setSchedules] = useState<Array<Schedule>>([]);
    const dispatch = useDispatch();
    const theme = useTheme();

    const {mySchedules} = useSelector((state: any) => state.appState);

    useEffect(() => {
     setSchedules(mySchedules); 
    }, [mySchedules])
    
    return(
        <View style={[SpacingStyles.fullSizeContainer, SpacingStyles.centeredContainer, {padding: '5%', backgroundColor: theme.colors.background}]}>
            {
                user !== undefined &&
                <SkateProfiles profiles={user?.skateProfiles} value={currentSkateProfile}
                onValueChange={(profile) => {dispatch(setCurrentSkateProfile(profile))}}></SkateProfiles>
                
            }
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


