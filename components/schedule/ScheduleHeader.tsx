import React from 'react'
import { View } from 'react-native';

import { Appbar } from 'react-native-paper';

import { Button, AppHeader } from '../general';

const ScheduleHeader = () => {

    const _goBack = () => console.log('Went back');

    return(
        <AppHeader>
            <Appbar.BackAction onPress={_goBack} />
            <View style={{width: '50%'}}></View>
            <View style={{width: '30%'}}>
                <Button text="SAVE" callBack={() => console.log("handle save")}/>
            </View>
        </AppHeader>
       
    );
};

export default ScheduleHeader;