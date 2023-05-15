import React from 'react'
import { StyleSheet, View } from 'react-native';

import { Text, useTheme } from 'react-native-paper';
import { scale } from 'react-native-size-matters';
import { getStyle } from 'react-native-svg/lib/typescript/xml';
import { FemaleSvg } from '../svg/general';
import SvgView from './SvgView';

interface Input {
    selected?: boolean,
    color?: string
}
const FemaleOption = ({selected, color} : Input) => {

    const getStyle = () => 
    {
        if(selected === true)
            return {...styles.iconWithLabel, backgroundColor: theme.colors.tertiary}
        else if(color !== undefined)
        {
            return {...styles.iconWithLabel, backgroundColor: color}
        }
        else return styles.iconWithLabel;     
    }
    const theme = useTheme();
    
    return(
        <View style={getStyle()}>
            <SvgView size='big'>
                <FemaleSvg></FemaleSvg>
            </SvgView>
            <Text>Female</Text>
        </View>
    );
}

export default FemaleOption;

const styles = StyleSheet.create({
    iconWithLabel: {
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 20,
        backgroundColor: 'white',
        padding: scale(10),
        margin: scale(10)
    }
});