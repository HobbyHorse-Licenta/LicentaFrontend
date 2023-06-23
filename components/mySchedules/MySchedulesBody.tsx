import React from 'react'
import { View, ScrollView} from 'react-native';

import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { SpacingStyles } from '../../styles';
import ScheduleElement from './ScheduleElement';
import AddScheduleElement from './AddScheduleElement';
import { useDispatch, useSelector } from 'react-redux';
import { SkateProfiles } from '../profile';
import { RootState } from '../../redux/store';
import { backupUser, deleteSchedule, revertChangesInUser, setCurrentSkateProfile } from '../../redux/appState';
import { Fetch } from '../../services';
import { nothing } from 'immer';
import { uiUtils, validation } from '../../utils';
import { setExistingScheduleState } from '../../redux/createScheduleState';
import { Schedule as ScheduleType } from '../../types';

const MySchedulesBody = () => {

    const navigation = useNavigation();
    const {currentSkateProfile, user, JWTTokenResult} = useSelector((state: RootState) => state.appState)

    const dispatch = useDispatch();
    const theme = useTheme();

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


