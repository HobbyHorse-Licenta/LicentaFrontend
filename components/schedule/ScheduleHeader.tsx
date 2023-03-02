import React from 'react'
import { View } from 'react-native';

import { Appbar } from 'react-native-paper';

import { SpacingStyles } from '../../styles'
import { Button } from '../general';

const ScheduleHeader = () => {

    const _goBack = () => console.log('Went back');

    return(
        <View style={[SpacingStyles.fullSizeContainer, {justifyContent: 'center'}]}>
            <Appbar.Header style={[SpacingStyles.fullSizeContainer, {alignSelf: 'center'}, SpacingStyles.centeredContainer]}>
                <Appbar.BackAction onPress={_goBack} />
                <View style={{width: '50%'}}></View>
                <View style={{width: '30%'}}>
                    <Button text="SAVE" callBack={() => console.log("handle save")}/>
                </View>
             </Appbar.Header>
            

        </View>
       
    );
};

export default ScheduleHeader;