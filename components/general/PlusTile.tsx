import React from 'react'
import { View } from 'react-native';

import { useTheme } from 'react-native-paper';

import { SpacingStyles } from '../../styles';
import { PlusSvg } from '../svg/general';

const PlusTile = () => {

    const theme = useTheme();

    return(
        <View style={[SpacingStyles.centeredContainer, SpacingStyles.tile, {backgroundColor: theme.colors.onSecondaryContainer}]}>
            <PlusSvg></PlusSvg>
        </View>
   
    );
};

export default PlusTile;
