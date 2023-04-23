import { AnyAaaaRecord } from 'dns';
import React, {useState, ReactNode} from 'react'
import { Pressable, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { PlusSvg } from '../svg/general';
import PrimaryContainer from './PrimaryContainer';
import SvgView from './SvgView';

import Tile from './Tile'
interface Input {
    objectsArray: Array<ReactNode> | null,
}
const TileList = ({objectsArray} : Input) => {

    const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);
    
    const theme = useTheme();
    return (
        <View>
            <Tile color='pink' isIcon={true} onPress={() => console.log("add Skill")}>
                <SvgView size='small'>
                    <PlusSvg></PlusSvg>
                </SvgView>
               
            </Tile>
            {objectsArray !== null && objectsArray.map((object, index) => {
                return(
                    <Tile key={index} enabled={index === selectedIndex} onDeleteTile={() => console.log("delete tile")} onLongPress={() => setSelectedIndex(index)}>
                        {object}
                    </Tile>
                );
            })}
        </View>
    )
};

export default TileList;