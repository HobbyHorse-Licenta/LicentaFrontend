import React from 'react';
import {View } from 'react-native';

import * as Animatable from 'react-native-animatable';

const LoadingScreen = () => {
    
  return (
    <View style={{width: '100%', height: '100%', justifyContent:'center', alignItems:'center'}}>
       <Animatable.Image animation="rotate" duration={300} easing="ease-out" iterationCount={Infinity} iterationDelay={600} style={{resizeMode:'center'}}
        source={require('../../assets/randomPics/hobby_horse.png')}></Animatable.Image>
    </View>
  );
};

export default LoadingScreen;
