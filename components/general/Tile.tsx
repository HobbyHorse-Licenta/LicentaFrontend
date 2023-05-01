import React, {ReactNode} from 'react'
import { Pressable, View, StyleSheet} from 'react-native';
import Color from 'color';
import { child } from 'react-native-extended-stylesheet'

import { useTheme } from 'react-native-paper';
import { scale } from 'react-native-size-matters';

import { DeleteSvg } from '../svg/general';
import SvgView from './SvgView';

interface Input {
    color?: string,
    withBorder?: boolean,
    children: ReactNode,
    deleteEnabled?: boolean,
    onLongPress?: Function,
    onPress?: Function,
    onDeleteTile?: Function,
    isIcon?: boolean
}
const Tile = ({color, children, deleteEnabled, onLongPress, onDeleteTile, onPress, isIcon, withBorder} : Input) => {

    const theme = useTheme();
    return (
        <View>
            <Pressable onPress={() => onPress && onPress()} onLongPress={() => onLongPress && onLongPress()}>
            {
                isIcon === true ? 
                (
                    withBorder === true ? (
                    <SvgView size='small' style={{backgroundColor: color ? color : theme.colors.secondary, borderColor: Color(color).darken(10/100).hex(), borderWidth: 1}}>
                        {children}
                    </SvgView>
                    )
                    : (
                    <SvgView size='small' style={{backgroundColor: color ? color : theme.colors.secondary}}>
                        {children}
                    </SvgView>
                    )  
                ):
                (
                    withBorder === true ? (
                    <View style={{...styles.tile, backgroundColor: color ? color : theme.colors.secondary, borderColor: Color(color).darken(10/100).hex(), borderWidth: 1}}>
                        {children}
                    </View>
                    )
                    : (
                    <View style={{...styles.tile, backgroundColor: color ? color : theme.colors.secondary}}>
                        {children}
                    </View>
                    )  
                    
                )
            }
            </Pressable>
            {
                deleteEnabled === true &&
                <SvgView size='small' onPress={() => onDeleteTile && onDeleteTile()} style={styles.deleteTile}>
                    <DeleteSvg></DeleteSvg>
                </SvgView>
            }
        </View>
           
    )
};

export default Tile;


const styles = StyleSheet.create({
    svgTile: {
        padding: scale(2),
        borderRadius: 20,
        height: scale(50),
        width: scale(50)
    },
    deleteTile: {
        width: scale(30),
        height: scale(30),
        borderRadius: 25, 
        minHeight: 10,
        minWidth: 10,
        maxHeight: 45,
        maxWidth: 45, 
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        margin: scale(3),
        position: 'absolute',
        right: 0,
        top: 0,
        backgroundColor: 'red'
        
    },
    tile: {
        paddingVertical: scale(4),
        paddingHorizontal: scale(8),
        borderRadius: 10,
        minHeight: 25,
        minWidth: 25,
        maxHeight: 120,
        maxWidth: 120, 
        alignItems: 'center',
        justifyContent: 'center',
        margin: scale(7)
      },

});