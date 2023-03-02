import React from 'react';
import {Text, View} from 'react-native';

import { SpacingStyles } from "../../styles";
import { LocationSvg } from '../svg/general';


const SelectLocation = () => {

    return(
        <View style={[SpacingStyles.centeredContainer, SpacingStyles.fullSizeContainer, {flexDirection: 'row'}]}>
           <View style={SpacingStyles.tile}>
            <LocationSvg></LocationSvg>
           </View>
            <Text>Location</Text>
        </View>
      
    );
};

export default SelectLocation;