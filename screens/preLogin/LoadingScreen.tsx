import React, { FC} from 'react';
import {Image, View } from 'react-native';

const LoadingScreen: FC = () => {
    
  return (
    <View style={{width: '100%', height: '100%', justifyContent:'center', alignItems:'center'}}>
        <Image style={{resizeMode:'center'}}
        source={require('../../assets/hobby_horse.png')}
        ></Image>
    </View>
  );
};

export default LoadingScreen;
