import React from 'react'
import { View } from 'react-native';

import { useTheme } from 'react-native-paper';
import { useSvg } from '../../hooks';

import { SpacingStyles } from '../../styles';
import { SportName } from '../../types';



const SportTile = ({sport}:SportName) => {

    const theme = useTheme();
    const svg = useSvg({sport});
    return(
        <View style={[SpacingStyles.tile, {backgroundColor: theme.colors.onSecondaryContainer}]}>
            {svg}
        </View>
   
    );
};

export default SportTile;
