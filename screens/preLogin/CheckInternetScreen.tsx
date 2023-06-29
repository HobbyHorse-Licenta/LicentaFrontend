import React from 'react';
import {View } from 'react-native';

import { Text } from 'react-native-paper';

import { SvgView } from '../../components/general';
import { NoInternetSvg } from '../../components/svg/general';

const CheckInternetScreen = () => {
    
  return (
    <View style={{width: '100%', height: '100%', justifyContent:'center', alignItems:'center'}}>
        <SvgView size="very large">
          <NoInternetSvg></NoInternetSvg>
        </SvgView>
        <Text>CHECK INTERNET</Text>
    </View>
  );
};

export default CheckInternetScreen;
