import React from "react";

import * as Animatable from 'react-native-animatable';

import PrimaryContainer from "./PrimaryContainer";

interface Input{
    width: number,
    height: number,
}
const LoadingComponent  = ({width, height} : Input) => {

    const minimumDimension = width < height ? width : height;
    const logoSize = minimumDimension / 2; 
    return(
        <PrimaryContainer styleInput={{width: width, height: height}}>
            <Animatable.Image animation="rotate" duration={300} easing="ease-out" iterationCount={Infinity} iterationDelay={600} style={{width: logoSize, height: logoSize}}
            source={require('../../assets/randomPics/hobby_horse.png')}></Animatable.Image>
        </PrimaryContainer>
    )
}


export default  LoadingComponent;