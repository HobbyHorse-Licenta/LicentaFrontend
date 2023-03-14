import React from 'react'
import { TouchableOpacity, StyleSheet, View} from 'react-native';

import { useTheme } from 'react-native-paper';
import { scale } from 'react-native-size-matters';

import { useSvg } from '../../hooks';
import { SpacingStyles } from '../../styles';
import { Sport, SportName } from '../../types';
import { DeleteSvg } from '../svg/general';

interface SportTileParam {
    sport: SportName,
    color: string,
    onLongPress: Function,
    deleteTile: Function
}

const SelectedSportTile = ({sport, color, onLongPress, deleteTile}: SportTileParam)  => {

    const svg = useSvg(sport);
    return(
        <View>
            <TouchableOpacity onLongPress={() => onLongPress()} style={[SpacingStyles.tile, {backgroundColor: color}]}>
                {svg}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTile()} style={styles.tile}>
                <DeleteSvg></DeleteSvg>
            </TouchableOpacity>
        </View>
    );
};

export default SelectedSportTile;

const styles = StyleSheet.create({
    tile: {
        width: scale(17),
        height: scale(17),
        borderRadius: 25, 
        minHeight: 10,
        minWidth: 10,
        maxHeight: 45,
        maxWidth: 45, 
        alignItems: 'center',
        justifyContent: 'center',
        margin: scale(3),
        position: 'absolute',
        right: 0,
        top: 0
        
    }
});