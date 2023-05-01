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
 * Should be wrapped in a View of desired size
 */
const ProfilePicList = ({imageUrlsArray} : ProfilePicListInput) => {

    const [viewWidth, setViewWidth] = useState(0);
    useEffect(() => {
      setViewWidth(Dimensions.get('screen').width)
      totalImageLength();
    }, [])
    
    const handleViewChange = (layout) => {
        const {x, y, width, height} = layout
        setViewWidth(width);
    }

    const totalImageLength = () => {
       return (imageSize/2) * (6 + 1);
    }

    const computeImageOffset = (index: number) => {
        
        // const freeSpace = Dimensions.get('window').width - totalImageLength();
        // const offset = (freeSpace/4) + totalImageLength() - imageSize;
        // const value = - (index * (imageSize * 1.5)) + offset;
        // return value;
        return -(index) * imageSize/2
    }

    return(
            <View style={[SpacingStyles.centeredContainer, {margin: scale(5)}]}>
                <View style={[{flexDirection: 'row', position:'relative', margin: scale(14)}, SpacingStyles.centeredContainer]} onLayout={(event) => handleViewChange(event.nativeEvent.layout)}>  
                {imageUrlsArray !== undefined && imageUrlsArray.map((imageUrl, index) => {
                        return(
                            <Image key={index} source={{uri: imageUrl !== undefined ? imageUrl : blankProfilePictureUrl}}  style={[{left: computeImageOffset(index), width: imageSize, height: imageSize}, styles.profileImage]}/>
                            //     <View key={index} style={[styles.imageContainer, {width: imageSize, height: imageSize, backgroundColor: 'green', left: computeImageOffset(index)}]}>                            
                            //         <Image source={{uri: imageUrl !== undefined ? imageUrl : blankProfilePictureUrl}}  style={[{left: computeImageOffset(index)}, styles.profileImage]}/>
                            //    </View>
                            
                        )
                })}
                
                </View>
                <Text>{imageUrlsArray !== undefined ? imageUrlsArray.length : 0} people</Text> 
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