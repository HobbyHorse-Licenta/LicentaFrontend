import React from 'react'
import { TouchableOpacity, View} from 'react-native';

import { useTheme } from 'react-native-paper';

import { useSvg } from '../../hooks';
import { SpacingStyles } from '../../styles';
import { TableTennisSVG } from '../svg/sports';
import { Sport, SportName } from '../../types';

interface SportTileParam {
    sport: SportName,
    color?: string,
    onLongPress: Function
}

const SportTile = ({sport, color, onLongPress}: SportTileParam)  => {

    const theme = useTheme();
    const svg = useSvg(sport);
    return(
        <View>
            <TouchableOpacity onLongPress={() => onLongPress()} style={[SpacingStyles.tile, {backgroundColor: color ? color : theme.colors.secondary}]}>
                {svg}
            </TouchableOpacity>
        </View>
   
    );
};

export default SportTile;