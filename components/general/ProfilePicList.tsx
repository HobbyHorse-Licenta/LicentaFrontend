import React from 'react'
import { View, StyleSheet, Image } from 'react-native';

import { scale } from 'react-native-size-matters';
import {Text} from 'react-native-paper'
import uuid from 'react-native-uuid'

import { SpacingStyles } from '../../styles';
import { blankProfilePictureUrl } from '../../assets/imageUrls';

const imageSize = scale(30);

interface ProfilePicListInput {
    imageUrlsArray: Array<string | undefined> | undefined,
    grayedOutImageUrlsArray: Array<string | undefined> | undefined,
}

/**
 * Has a fixed size
 */
const ProfilePicList = ({imageUrlsArray, grayedOutImageUrlsArray} : ProfilePicListInput) => {

    
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

    const maxNormalPics = 5;
    const maxGrayedOutPics = 3;

    let secondaryStartingIndex = 0;
    if(imageUrlsArray !== undefined)
    {
        if(imageUrlsArray.length > maxNormalPics)
        {
            secondaryStartingIndex = maxNormalPics;
        }
        else secondaryStartingIndex = imageUrlsArray.length;
    }

    let totalPicCount = 0;
    if(grayedOutImageUrlsArray !== undefined)
    {
        if(grayedOutImageUrlsArray.length > maxGrayedOutPics)
        {
            totalPicCount = secondaryStartingIndex + maxGrayedOutPics;
        }
        else totalPicCount = secondaryStartingIndex + grayedOutImageUrlsArray.length;
    }
    else totalPicCount = secondaryStartingIndex;

    return(
            <View style={[SpacingStyles.centeredContainer, {alignSelf: 'center', width: componentWidth, height: imageSize * 2}]}>
                <View style={[{flexDirection: 'row', width:'100%'}, SpacingStyles.centeredContainer]}>
                {
                    grayedOutImageUrlsArray !== undefined && grayedOutImageUrlsArray.map((imageUrl, index) => {
                            if(index < maxNormalPics)
                            return(
                                <Image key={uuid.v4().toString()} 
                                source={{uri: imageUrl !== undefined ? imageUrl : blankProfilePictureUrl}}
                                style={[{right: computeImageOffset(index), top: 0, width: imageSize, height: imageSize}, styles.profileImage]}/>             
                            )
                    })}  
                    {imageUrlsArray !== undefined && imageUrlsArray.map((imageUrl, index) => {
                            if(index < maxGrayedOutPics)
                            return(
                                <Image key={uuid.v4().toString()} 
                                source={{uri: imageUrl !== undefined ? imageUrl : blankProfilePictureUrl}}
                                style={[{right: computeImageOffset(secondaryStartingIndex + index), top: 0, width: imageSize, height: imageSize}, styles.profileImage2]}/>            
                            )
                    })}
                    
                </View>
                <Text style={{marginTop: imageSize}}>{totalPicCount} people</Text> 
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
        borderRadius: 100,
        position: 'absolute',
        borderWidth: 3/100*imageSize,
        borderColor: 'white'
   },
   profileImage2: {
    borderRadius: 100,
    position: 'absolute',
    borderWidth: 3/100*imageSize + 1,
    borderColor: 'red'
    }
});