import React, {useRef} from 'react'
import {View, Text} from 'react-native'

import * as Animatable from 'react-native-animatable';

interface Input {
    text: string,
    textTravel?: number,
    speedScaler?: number
}

const HorizontalTextScroll = ({text, textTravel, speedScaler} : Input) => {
    const animationRef = useRef(null);
    const scaler = speedScaler !== undefined ? speedScaler : 1;
    const runningWidth = textTravel !== undefined ? textTravel : 300;
    
    const slideInAndOut = {
    0: {
        left: -runningWidth

    },
    1: {
        left: runningWidth
    },
    };

    return(
        <Animatable.Text ref={animationRef} animation={slideInAndOut} iterationCount={Infinity} duration={scaler * 10000} easing={'linear'}
        style={{fontSize: 12}}
        >{text}</Animatable.Text>
    )
}

export default HorizontalTextScroll;