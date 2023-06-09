import React, { useState, useEffect, ReactNode} from 'react'
import { View, StyleSheet, Image, Dimensions } from 'react-native';

import { scale } from 'react-native-size-matters';
import {Text} from 'react-native-paper'

import { SpacingStyles } from '../../styles';
import { blankProfilePictureUrl } from '../../assets/imageUrls';

const imageSize = scale(30);

interface ProfilePicListInput {
    imageUrlsArray: Array<string | undefined> | undefined
}

/**
 * Has a fixed size
 */
const ProfilePicList = ({imageUrlsArray} : ProfilePicListInput) => {

    
    let picturesDisplayed = 0;
    if(imageUrlsArray !== undefined)
    {
        if(imageUrlsArray.length < 6)
            picturesDisplayed = imageUrlsArray.length;  
        else picturesDisplayed = 6;
    }
    else picturesDisplayed = 0;

    const picListSize = ((picturesDisplayed + 1) * imageSize/2);
    const marginOnASide = scale(30);
    const componentWidth = picListSize + 2 * marginOnASide;

    const computeImageOffset = (index: number) => {
        return (index) * imageSize/2 + marginOnASide;
    }

    return(
            <View style={[SpacingStyles.centeredContainer, {alignSelf: 'center', width: componentWidth, height: imageSize * 2}]}>
                <View style={[{flexDirection: 'row', width:'100%'}, SpacingStyles.centeredContainer]}>  
                    {imageUrlsArray !== undefined && imageUrlsArray.map((imageUrl, index) => {
                            if(index < 6)
                            return(
                                <Image key={index} 
                                source={{uri: imageUrl !== undefined ? imageUrl : blankProfilePictureUrl}}
                                style={[{right: computeImageOffset(index), top: 0, width: imageSize, height: imageSize}, styles.profileImage]}/>            
                            )
                    })}
                </View>
                <Text style={{marginTop: imageSize}}>{imageUrlsArray !== undefined ? imageUrlsArray.length : 0} people</Text> 
            </View>
    );
};

export default ProfilePicList;

const styles = StyleSheet.create({
   imageContainer:{
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center' 
   },
   profileImage: {
        // width: '100%',
        // height: '100%',
        borderRadius: 100,
        position: 'absolute',
        borderWidth: 3/100*imageSize,
        borderColor: 'white'
   }
});