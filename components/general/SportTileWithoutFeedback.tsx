import React from 'react'
import { View} from 'react-native';

import { useTheme } from 'react-native-paper';

import { useSvg } from '../../hooks';
import { SpacingStyles } from '../../styles';
import { SportName } from '../../types';

interface SportTileParam {
    sport: SportName,
    color?: string,
    onLongPress: Function
}

const SportTileWithoutFeedback = ({sport, color, onLongPress}: SportTileParam)  => {

    const theme = useTheme();
    const svg = useSvg(sport);
    return(
        <View style={[SpacingStyles.tile, {backgroundColor: color ? color : theme.colors.secondary}]}>
                {svg}
        </View>
   
    );
};

export default SportTileWithoutFeedback;