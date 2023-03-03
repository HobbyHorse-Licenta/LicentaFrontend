import React, { useState, useEffect} from 'react'
import { View, StyleSheet, Image, Dimensions } from 'react-native';

import { scale } from 'react-native-size-matters';
import {Text} from 'react-native-paper'

import { SpacingStyles } from '../../styles';

const imageSize = scale(30);

const ProfilePicList = () => {

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
        console.log("offset: " + offset)
        const value = - (index * (imageSize * 1.5)) + offset;
        console.log(value + " -> idx: " + index);
        return value;
    }

    const [imageArray, setImageArray] = useState([
        <Image source={require('../../assets/profilePics/1.jpg')} style={[{left: computeImageOffset(0)}, styles.profileImage]}/>,
        <Image source={require('../../assets/profilePics/2.jpeg')} style={[{left: computeImageOffset(1)}, styles.profileImage]}/>,
        <Image source={require('../../assets/profilePics/3.jpeg')} style={[{left: computeImageOffset(2)}, styles.profileImage]}/>,
        <Image source={require('../../assets/profilePics/4.jpg')} style={[{left: computeImageOffset(3)}, styles.profileImage]}/>,
        <Image source={require('../../assets/profilePics/5.jpg')} style={[{left: computeImageOffset(4)}, styles.profileImage]}/>,
        <Image source={require('../../assets/profilePics/6.jpg')} style={[{left: computeImageOffset(5)}, styles.profileImage]}/>,
    ]);
    
    return(
        <View style={[SpacingStyles.centeredContainer, {width: '100%', height: '100%', backgroundColor: 'purple'}]}>

            <View style={[SpacingStyles.centeredContainer, {backgroundColor: 'red'}]}>
                <View style={[{flexDirection: 'row'}, SpacingStyles.centeredContainer]} onLayout={(event) => handleViewChange(event.nativeEvent.layout)}>  
                {imageArray.map((image) => {
                        return(
                            <View style={[styles.imageContainer, {width: imageSize, height: imageSize}]}>
                                {image}
                            </View>
                        )
                })}
                
                </View>
                <Text>{imageArray.length} people</Text> 
            </View>
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