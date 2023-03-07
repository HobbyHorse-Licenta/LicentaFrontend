import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native';

import {Text, useTheme} from 'react-native-paper'
import { verticalScale } from 'react-native-size-matters';

import { SpacingStyles } from '../../styles'
import { PrimaryContainer, SportTile } from '../general';
import PlusTile from '../general/PlusTile';

const AddSports = () => {

    const theme = useTheme();

    return(
        <PrimaryContainer>
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
        </PrimaryContainer>
    );
};

export default AddSports;

const styles = StyleSheet.create({
    addSportsContainer: {
        padding: verticalScale(15),
    }
    
});