import React, { useState, useEffect } from 'react';
import {View, StyleSheet} from 'react-native';

import { scale, verticalScale } from 'react-native-size-matters';
import {Text, useTheme} from 'react-native-paper'
import WheelPickerExpo from 'react-native-wheel-picker-expo';

import { SpacingStyles } from "../../styles";
import { LocationSvg } from '../svg/general';
import { PrimaryContainer } from '../general';

interface Distance {
    label: string,
    value: number
}

const SelectLocation = () => {
    const [rangeArray, setRangeArray] = useState<Distance[]>([
        {label: '+1', value: 1},
        {label: '+2', value: 2},
        {label: '+3', value: 3},
        {label: '+4', value: 4},
        {label: '+5', value: 5},
        {label: '+10', value: 10},
        {label: '+15', value: 15},
        {label: '+30', value: 30},
        {label: '+60', value: 60},
        {label: '+100', value: 100},

    ]);
    const [range, setRange] = useState<number>(0);

    const theme = useTheme();

    useEffect(() => {
      console.log("changed range");
    }, [range])
    
    const renderWheelPicker = (itemToRender) => {
        return(
            <Text style={{margin: verticalScale(3), alignSelf: 'center'}}>{itemToRender.label}</Text>
        );
    }
    return(
        <PrimaryContainer styleInput={{flexDirection: 'row', padding: scale(10)}}>
            <View style={{flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
                <View style={[SpacingStyles.tile, {backgroundColor: theme.colors.tertiary, borderRadius: 10}]}>
                    <LocationSvg></LocationSvg>
                </View>

                <Text variant='bodyLarge'>Location</Text>
            </View>
            
            <View style={styles.picker}>
                <WheelPickerExpo
                height={verticalScale(100)}
                width={scale(40)}
                initialSelectedIndex={0}
                items={rangeArray.map(range => ({ label: range.label, value: range.label}))}
                onChange={( range ) => {console.log(range.item.label); setRange(range.item.value)}}
                selectedStyle={{borderColor: theme.colors.tertiary, borderWidth: 1}}
                renderItem={(itemToRender) => renderWheelPicker(itemToRender)}
                haptics={false}
                />
                <Text>km</Text>
            </View>
            

        </PrimaryContainer>
      
    );
};

export default SelectLocation;

const styles = StyleSheet.create({
    picker: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: scale(10)
    }
});