import React, {useEffect, useState} from 'react'
import { View, ScrollView} from 'react-native';

import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { nothing } from 'immer';

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
    
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const theme = useTheme();

    useEffect(() => {
        getAndSetSchedules();
    }, [])
    
    useEffect(() => {
        if(needsSchedulesRefresh === true)
        {
            console.log("AM INTRAT AICI SA DAM REFRESH LA SCHEDULES");
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
        if(currentSkateProfile !== undefined && currentSkateProfile.schedules !== undefined && currentSkateProfile.schedules !== null)
        {
            dispatch(backupUser());
            const scheduleId = currentSkateProfile.schedules[scheduleIndex].id;
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
        if(currentSkateProfile !== undefined && currentSkateProfile.schedules !== undefined)
        {
            const scheduleToUpdate: ScheduleType = currentSkateProfile.schedules[scheduleIndex];
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
                (currentSkateProfile !== undefined && currentSkateProfile.schedules !== undefined && currentSkateProfile.schedules !== null && currentSkateProfile.schedules.length > 0) ? (
                    <ScrollView>
                        {currentSkateProfile.schedules.map((sch, index) => {
                            return(
                                <ScheduleElement index={index} key={sch.id} schedule={sch}
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


