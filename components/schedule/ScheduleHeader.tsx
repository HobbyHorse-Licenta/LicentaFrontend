import React from 'react'
import { View } from 'react-native';

import { Appbar, useTheme } from 'react-native-paper';

import { SpacingStyles } from '../../styles'
import { Button } from '../general';

const ScheduleHeader = () => {

    const _goBack = () => console.log('Went back');

    const theme = useTheme();

    return(
        <Appbar.Header style={[SpacingStyles.fullSizeContainer, {alignSelf: 'center'}]}>
                    <Appbar.BackAction onPress={_goBack} />
                    <View style={{width: '50%'}}></View>
                    <View style={{width: '30%'}}>
                        <Button text="SAVE" callBack={() => console.log("handle save")}/>
                    </View>
                </Appbar.Header>
        // <View>
                
        //         <View style={[SpacingStyles.bottomHeaderAddOn, { backgroundColor: theme.colors.surface}]}></View>
        // </View>
        // <View style={[SpacingStyles.header, {justifyContent: 'center', backgroundColor: theme.colors.surface}]}>
            
        // </View>
       
    );
};

export default ScheduleHeader;