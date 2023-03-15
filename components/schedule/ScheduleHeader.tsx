import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View } from 'react-native';

import { Appbar } from 'react-native-paper';

import { Button, AppHeader } from '../general';

const ScheduleHeader = () => {

    const navigation = useNavigation();

    const _goBack = () => navigation.goBack();

    return(
        <AppHeader>
            <Appbar.BackAction onPress={_goBack} />
            <View style={{width: '50%'}}></View>
            <View style={{width: '30%'}}>
                <Button text="SAVE" callBack={() => console.log("[ScheduleHeader]: handle save")}/>
            </View>
        </AppHeader>
       
    );
};

export default ScheduleHeader;