import React, { FC} from 'react';
import {Image, View } from 'react-native';

interface Props{
    widthPercentage: string,
    heightPercentage: string,
    pictureName: string
}

export const SizedImage: FC<Props> = ({widthPercentage, heightPercentage, pictureName}) => {

    const createPath = () => {
        const path = '../../assets/'  + pictureName;
        return require(path);
    }
  return (
    <View style={{width: widthPercentage, height: heightPercentage, justifyContent:'center', alignItems:'center'}}>
        {/* <Image style={{resizeMode: 'contain', alignSelf: 'center'}}
        source={createPath()}
        ></Image> */}
    </View>
  );
};
