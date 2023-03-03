import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native';

import {verticalScale} from 'react-native-size-matters'
import {Text, useTheme} from 'react-native-paper'

import { SpacingStyles } from '../../styles'
import { SportTile } from '../general';
import PlusTile from '../general/PlusTile';

const AddSports = () => {

    const theme = useTheme();

    return(
       <View style={[SpacingStyles.centeredContainer, styles.addSportsContainer , {backgroundColor: theme.colors.primary}]}>
            <Text>Sports</Text>
           
            <View style={[SpacingStyles.centeredContainer, {flexDirection: 'row'}]}>
                <FlatList   data={
                            [<PlusTile></PlusTile>,
                            <SportTile sport={{sportName: 'Tennis'}} color={theme.colors.secondary}></SportTile>,
                            <SportTile sport={{sportName: 'Ping-Pong'}} color={theme.colors.secondary}></SportTile>,
                            <SportTile sport={{sportName: 'Hiking'}} color={theme.colors.secondary}></SportTile>,
                            <SportTile sport={{sportName: 'Basketball'}} color={theme.colors.secondary}></SportTile>,
                            <SportTile sport={{sportName: 'Tennis'}} color={theme.colors.secondary}></SportTile>,
                            <SportTile sport={{sportName: 'Hiking'}} color={theme.colors.secondary}></SportTile>]}

                            renderItem = {
                                ({item, index, separators}) => (<View>{item}</View>)
                            }
                 horizontal={true}
                
                />
            </View>
       </View>
    );
};

export default AddSports;

const styles = StyleSheet.create({
    addSportsContainer: {
        borderRadius: 15,
        padding: verticalScale(15)
    }
});