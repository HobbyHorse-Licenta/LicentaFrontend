import React, {ReactNode} from 'react'
import { Pressable, View, StyleSheet} from 'react-native';
import { child } from 'react-native-extended-stylesheet';

import { useTheme } from 'react-native-paper';
import { scale } from 'react-native-size-matters';

import { SpacingStyles } from '../../styles';
import { DeleteSvg, PlusSvg } from '../svg/general';
import SvgView from './SvgView';

interface Input {
    color?: string,
    children: ReactNode,
    enabled?: boolean,
    onLongPress?: Function,
    onPress?: Function,
    onDeleteTile?: Function,
    isIcon?: boolean
}
const Tile = ({color, children, enabled, onLongPress, onDeleteTile, onPress, isIcon} : Input) => {

    const theme = useTheme();
    console.log(typeof(children));
    return (
        <View>
            <Pressable onPress={() => onPress && onPress()}
            onLongPress={() => onLongPress && onLongPress()} style={[SpacingStyles.tile, {backgroundColor: color ? color : theme.colors.secondary}]}>
            {
                isIcon === true ? 
                (
                    <SvgView size='small' style={{...styles.svgTile, borderColor: theme.colors.tertiary}} >
                        {children}
                    </SvgView>
                ):
                (
                    <View style={[styles.textTile, {borderColor: theme.colors.tertiary}]}>
                        {children}
                    </View>
                )
            }
            </Pressable>
            {
                enabled === true &&
                <SvgView size='small' onPress={() => onDeleteTile && onDeleteTile()} style={styles.tile}>
                    <DeleteSvg></DeleteSvg>
                </SvgView>
            }
           
        </View>
    )
};

export default Tile;


const styles = StyleSheet.create({
    textTile: {
        padding: scale(2),
        borderRadius: 20,
    },
    svgTile: {
        padding: scale(2),
        borderRadius: 20,
        height: scale(50),
        width: scale(50)
    },
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