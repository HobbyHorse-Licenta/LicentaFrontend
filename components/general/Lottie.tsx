import React from 'react'
import {View} from 'react-native'

import LottieView from 'lottie-react-native';
import { scale } from 'react-native-size-matters';

interface LottieInput {
    lottieRequire: any,
    width: number,
    height: number
    setup?: boolean,
    adjustMask?: number,
    maskColor?: string
}

const Lottie = ({lottieRequire, setup, adjustMask, width, height, maskColor} : LottieInput) => {
    const adjust = (adjustMask != undefined) ? adjustMask : 0;
    return(
        <View>
        <LottieView autoPlay source={lottieRequire}
        style={{
            width: scale(width),
            height: scale(height),
        }}
        />
        { (setup == true) ? (
            <View style={{width: width, height: (scale(height)/3), marginTop: -(scale(height)/3) + adjust, borderWidth: 2, borderColor: 'red'}}></View>
            ):(
                <View style={{width: width, height: (scale(height)/3), marginTop: -(scale(height)/3) + adjust, backgroundColor: (maskColor !== undefined) ? maskColor : 'white'}}></View>
                )}
        </View>
    );
}

export default Lottie;