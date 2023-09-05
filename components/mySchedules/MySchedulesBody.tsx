import React, {useEffect, useState} from 'react'
import { View, ScrollView} from 'react-native';

import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { nothing } from 'immer';
import uuid from 'react-native-uuid'


import { SpacingStyles } from '../../styles';
import ScheduleElement from './ScheduleElement';
import AddScheduleElement from './AddScheduleElement';
import { SkateProfiles } from '../profile';
import { RootState } from '../../redux/store';
import { backupUser, deleteSchedule, revertChangesInUser, setNeedsSchedulesRefresh, setSchedules } from '../../redux/appState';
import { Fetch } from '../../services';
import { uiUtils, validation } from '../../utils';
import { setExistingScheduleState } from '../../redux/createScheduleState';
import { Schedule as ScheduleType } from '../../types';
import { setCurrentSkateProfile } from '../../redux/globalState';

const MySchedulesBody = () => {

    const {user, JWTTokenResult, needsSchedulesRefresh} = useSelector((state: RootState) => state.appState)
    const {currentSkateProfile} = useSelector((state: RootState) => state.globalState)
    const [schedulesToDisplay, setSchedulesToDisplay] = useState<Array<ScheduleType> | undefined>(undefined);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const theme = useTheme();

    useEffect(() => {
        getAndSetSchedules();
    }, [])

    useEffect(() => {
        if(user !== undefined && user.skateProfiles !== undefined)
        {
            const updatedSkateProfile = user.skateProfiles.find(skateProfile => skateProfile.id === currentSkateProfile?.id)
            if(updatedSkateProfile && updatedSkateProfile.schedules !== undefined)
            {
                updatedSkateProfile.schedules.forEach(schedule => console.log("id: " + schedule.id + "   zoneId: "+ schedule.zones[0].id +"\n"))
                setSchedulesToDisplay(updatedSkateProfile.schedules)
            }
        }
    }, [user, currentSkateProfile])
    
    useEffect(() => {
        if(needsSchedulesRefresh === true)
        {
            getAndSetSchedules();
            dispatch(setNeedsSchedulesRefresh(false));
        }
    }, [needsSchedulesRefresh])
    
    const getAndSetSchedules = () => {
        if(JWTTokenResult !== undefined && !validation.isJWTTokenExpired(JWTTokenResult))
        {
            if(currentSkateProfile !== undefined && currentSkateProfile.id !== undefined)
            {
                Fetch.getSchedulesForSkateProfile(JWTTokenResult.token, currentSkateProfile.id,
                    (schedules) => dispatch(setSchedules({schedules: schedules, skateProfileId: currentSkateProfile.id})),
                    () => console.log("Could not get schedules from DB") 
                    );
            }
        }
        else{
            //REFRESH TOKEN
        }
        
    }

    const deleteASchedule = (scheduleIndex: number) => {
        if(schedulesToDisplay !== undefined && schedulesToDisplay !== null)
        {
            dispatch(backupUser());
            const scheduleId = schedulesToDisplay[scheduleIndex].id;
            dispatch(deleteSchedule(scheduleId));

            if(JWTTokenResult !== undefined && !validation.isJWTTokenExpired(JWTTokenResult))
            {
                Fetch.deleteSchedule(JWTTokenResult.token, scheduleId,
                    () => nothing, () => {
                        dispatch(revertChangesInUser());
                        uiUtils.showPopUp("Error", "Coudn't delete schedule");
                    })
            }
            else{
                //TODO refresh token
            }
           
        }
        

    } 
    const updateASchedule = (scheduleIndex: number) => {
        if(schedulesToDisplay !== undefined)
        {
            const scheduleToUpdate: ScheduleType = schedulesToDisplay[scheduleIndex];

            dispatch(setExistingScheduleState(scheduleToUpdate));
            navigation.navigate('Schedule' as never, {updateMode: true, scheduleToUpdate: scheduleToUpdate} as never);
        } 
    }


    return(
        <View style={[SpacingStyles.fullSizeContainer, SpacingStyles.centeredContainer, {padding: '5%', backgroundColor: theme.colors.background}]}>
            {
                user !== undefined &&
                <SkateProfiles profiles={user?.skateProfiles} value={currentSkateProfile}
                onValueChange={(profile) => {dispatch(setCurrentSkateProfile(profile))}}></SkateProfiles>
                
            }
            <AddScheduleElement onPress={() => navigation.navigate('Schedule' as never)}/>
            {
                (schedulesToDisplay !== undefined && schedulesToDisplay.length > 0) ? (
                    <ScrollView>
                        {schedulesToDisplay.map((sch, index) => {
                            return(
                                <ScheduleElement index={index} key={uuid.v4().toString()} schedule={sch}
                                onDelete={(scheduleIndex) => deleteASchedule(scheduleIndex)}
                                onUpdate={(scheduleIndex) => updateASchedule(scheduleIndex)}/>
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


