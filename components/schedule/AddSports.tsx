import React from 'react'
import {Text, View, FlatList } from 'react-native';

import { SpacingStyles } from '../../styles'
import { SportTile } from '../general';
import PlusTile from '../general/PlusTile';

const AddSports = () => {

    return(
       <View>
            <Text>Sports</Text>
           
            <View style={[SpacingStyles.centeredContainer, {flexDirection: 'row'}]}>
                <FlatList   data={
                            [<PlusTile></PlusTile>,
                            <SportTile sport='Tennis' ></SportTile>,
                            <SportTile sport='Ping-Pong' ></SportTile>,
                            <SportTile sport='Basketball' ></SportTile>,
                            <SportTile sport='Hiking' ></SportTile>,
                            <SportTile sport='Tennis' ></SportTile>,
                            <SportTile sport='Ping-Pong' ></SportTile>,
                            <SportTile sport='Basketball' ></SportTile>,
                            <SportTile sport='Hiking' ></SportTile>]}

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