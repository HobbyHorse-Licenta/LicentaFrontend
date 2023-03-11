import { useNavigation } from '@react-navigation/native';
import React from 'react'

import { Appbar, Text, useTheme } from 'react-native-paper';
import { scale } from 'react-native-size-matters';
import { SpacingStyles } from '../../styles';

import { AppHeader } from '../general';

interface Input {
    children: string
}

const EventHeader = ({children}: Input) => {

    const navigation = useNavigation();
    const _goBack = () => {
        console.log("Go back");
        navigation.goBack();
    }

    const theme = useTheme();
    return(
        <AppHeader>
            <Appbar.BackAction onPress={_goBack} style={SpacingStyles.goBackPosition} />
            <Text variant='headlineMedium' style={{position: 'absolute', alignSelf: 'center', color: theme.colors.primary}}>{children}</Text>
        </AppHeader>
    );
};

export default EventHeader;

