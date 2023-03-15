import React from 'react'
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';

import { Text, useTheme } from 'react-native-paper';

import { SpacingStyles } from '../../styles';
import { PlusSvg } from '../svg/general';

interface Input {
    onPress: Function,
    single: boolean
}
const PlusTile = ({onPress, single} : Input) => {

    const theme = useTheme();

    return(
        <TouchableOpacity onPress={() => onPress()} style={[single === true ? SpacingStyles.fullWidthTile : SpacingStyles.tile,SpacingStyles.centeredContainer, {backgroundColor: theme.colors.onSecondaryContainer}]}>
            {(single === true) ? <Text>Add Sport</Text> : <PlusSvg></PlusSvg>}
        </TouchableOpacity>
   
    );
};

export default PlusTile;
