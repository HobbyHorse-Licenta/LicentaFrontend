import React from 'react';
import {View } from 'react-native';

import * as Animatable from 'react-native-animatable';
import { Text } from 'react-native-paper';
import { SvgView } from '../../components/general';
import { NoInternetSvg } from '../../components/svg/general';

const CheckInternetScreen = () => {
    
  return (
    <View style={{width: '100%', height: '100%', justifyContent:'center', alignItems:'center'}}>
       {/* <Animatable.Image animation="rotate" duration={300} easing="ease-out" iterationCount={Infinity} iterationDelay={600} style={{resizeMode:'center'}}
        source={require('../../assets/randomPics/hobby_horse.png')}></Animatable.Image> */}
        <SvgView size="very large">
          <NoInternetSvg></NoInternetSvg>
        </SvgView>
        <Text>CHECK INTERNET</Text>
    </View>
  );
};

export default CheckInternetScreen;
