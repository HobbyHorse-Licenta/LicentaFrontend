import React, { useState, useEffect} from 'react'
import { View, StyleSheet, Image, Dimensions } from 'react-native';

import { scale } from 'react-native-size-matters';
import {Text} from 'react-native-paper'

import { SpacingStyles } from '../../styles';

const imageSize = scale(30);

interface ProfilePicListInput {
    imagePathArray: Array<string>
}

/**
 * Should be wrapped in a View of desired size
 */
const ProfilePicList = ({imagePathArray} : ProfilePicListInput) => {

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
        
        const freeSpace = Dimensions.get('window').width - totalImageLength();
        const offset = (freeSpace/4) + totalImageLength() - imageSize;
        const value = - (index * (imageSize * 1.5)) + offset;
        return value;
    }

    // const [imageArray, setImageArray] = useState([
    //     <Image source={require('../../assets/profilePics/1.jpg')} style={[{left: computeImageOffset(0)}, styles.profileImage]}/>,
    //     <Image source={require('../../assets/profilePics/2.jpeg')} style={[{left: computeImageOffset(1)}, styles.profileImage]}/>,
    //     <Image source={require('../../assets/profilePics/3.jpeg')} style={[{left: computeImageOffset(2)}, styles.profileImage]}/>,
    //     <Image source={require('../../assets/profilePics/4.jpg')} style={[{left: computeImageOffset(3)}, styles.profileImage]}/>,
    //     <Image source={require('../../assets/profilePics/5.jpg')} style={[{left: computeImageOffset(4)}, styles.profileImage]}/>,
    //     <Image source={require('../../assets/profilePics/6.jpg')} style={[{left: computeImageOffset(5)}, styles.profileImage]}/>,
    // ]);

    const images: Array<string> = [
        '../../assets/profilePics/1.jpg',
        '../../assets/profilePics/2.jpeg',
        '../../assets/profilePics/3.jpeg',
        '../../assets/profilePics/4.jpeg',
        '../../assets/profilePics/5.jpeg',
        '../../assets/profilePics/6.jpeg',
      ]
    
    return(
            <View style={[SpacingStyles.centeredContainer, {margin: scale(20)}]}>
                <View style={[{flexDirection: 'row'}, SpacingStyles.centeredContainer]} onLayout={(event) => handleViewChange(event.nativeEvent.layout)}>  
                {images.map((imagePath, index) => {
                        return(
                            <View key={index} style={[styles.imageContainer, {width: imageSize, height: imageSize}]}>
                                <Image source={require('../../assets/profilePics/1.jpg')} style={[{left: computeImageOffset(index)}, styles.profileImage]}/>
                                {/* <View style={[{left: computeImageOffset(index)}, styles.profileImage]}>
                                    {image}
                                </View> */}
                            </View>
                        )
                })}
                
                </View>
                <Text>{imagePathArray.length} people</Text> 
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
        width: '100%',
        height: '100%',
        borderRadius: 100,
        position: 'absolute',
        borderWidth: 3/100*imageSize,
        borderColor: 'white'
   }
});