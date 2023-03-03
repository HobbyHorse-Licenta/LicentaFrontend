import React, { useState, useEffect } from 'react';
import {View} from 'react-native';

import { scale } from 'react-native-size-matters';
import {Text} from 'react-native-paper'
import WheelPickerExpo from 'react-native-wheel-picker-expo';

import { SpacingStyles } from "../../styles";
import { LocationSvg } from '../svg/general';

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

    ]);
    const [range, setRange] = useState<number>(0);

    useEffect(() => {
      console.log("changed range");
    }, [range])
    
    return(
        <View style={[SpacingStyles.centeredContainer, SpacingStyles.fullSizeContainer, {flexDirection: 'row'}]}>
            <View style={SpacingStyles.tile}>
                <LocationSvg></LocationSvg>
            </View>

            <Text>Location</Text>

            <WheelPickerExpo
            height={scale(150)}
            width={scale(100)}
            initialSelectedIndex={0}
            items={rangeArray.map(range => ({ label: range.label, value: range.label}))}
            onChange={( range ) => {console.log(range.item.label); setRange(range.item.value)}} />

        </View>
      
    );
};

export default SelectLocation;