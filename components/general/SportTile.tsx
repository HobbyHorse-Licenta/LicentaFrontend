import React from 'react'
import { View } from 'react-native';

import { useTheme } from 'react-native-paper';
import { useSvg } from '../../hooks';

import { SpacingStyles } from '../../styles';
import { Sport } from '../../types';

interface SportTileParam {
    sport: Sport,
    color: string
}

const SportTile = ({sport, color}: SportTileParam)  => {

    const theme = useTheme();
    const svg = useSvg(sport);
    return(
        <View style={[SpacingStyles.tile, {backgroundColor: color}]}>
            {svg}
        </View>
   
    );
};

export default SportTile;
