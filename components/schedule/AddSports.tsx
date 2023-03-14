import React, {useState, useEffect, ReactNode} from 'react'
import { View, FlatList, StyleSheet } from 'react-native';

import {Text, useTheme} from 'react-native-paper'
import { verticalScale } from 'react-native-size-matters';

import { SpacingStyles } from '../../styles'
import { SportName } from '../../types';
import { PrimaryContainer, SelectedSportTile, SportTile } from '../general';
import SelectSportModal from './SelectSportModal'
import PlusTile from '../general/PlusTile';


interface AddSportsInput {
    onAddPress: Function,
    onDelete: Function,
    selectedSports: Array<SportName>
}
const AddSports = ({onAddPress, onDelete, selectedSports} : AddSportsInput) => {

    const [sportTiles, setSportTiles] = useState<Array<ReactNode>>();
    const [selectedSportIndex, setSelectedSportIndex] = useState<number>();

    const theme = useTheme();

    useEffect(() => {
        setSportTiles(getSportTilesArray(selectedSports));
    }, [selectedSports, selectedSportIndex])

    const flipTileSelection = (itemIndex: number) => {
        if(itemIndex === selectedSportIndex)
            setSelectedSportIndex(undefined);
        else setSelectedSportIndex(itemIndex);
    }

    const deleteTile = (sportToDelete: SportName) =>
    {
        setSelectedSportIndex(undefined);
        onDelete(sportToDelete);
    }
    const getSportTilesArray = (selSports: Array<SportName>) => {
        
        if(selSports.length > 0)
        {
            const array = selSports.map((sportName: SportName, index) => {
                return(
                    (selectedSportIndex != undefined && selectedSportIndex === index) ?
                    <SelectedSportTile deleteTile={() => deleteTile(sportName)} onLongPress={() => flipTileSelection(index)} sport={sportName} color={theme.colors.secondary}></SelectedSportTile>
                    :
                    <SportTile onLongPress={() => flipTileSelection(index)} sport={sportName} color={theme.colors.secondary}></SportTile>
                );
            });
            return [<PlusTile single={false} onPress={() => onAddPress()}></PlusTile>, ...array];
        }
        
        return [<PlusTile single={true} onPress={() => onAddPress()}></PlusTile>];
    }

    return(
        <PrimaryContainer>
            <Text>Sports</Text>
            <View style={[SpacingStyles.centeredContainer, {flexDirection: 'row'}]}>
                {
                    (selectedSports.length > 0) ? 
                    (
                        <FlatList   data={sportTiles}
                                renderItem = {
                                    ({item}) => (<View>{item}</View>)
                                }
                        horizontal={true}
                        />
                    ):(
                        <PlusTile single={true} onPress={() => onAddPress()}></PlusTile>
                    )
                } 
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