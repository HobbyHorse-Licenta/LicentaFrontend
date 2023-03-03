import React, { useState} from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import {Text} from 'react-native-paper'

import { SpacingStyles } from '../../styles';

const RoundPicUpload = () => {
    const [image, setImage] = useState<string | undefined>(undefined);
    const [imageSize, setImageSize] = useState<number>(0);

    const handlePickPicture = async () => {
        
        console.log("add profile picture");

        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [3, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
    };

    const handleSizeChange = (layout) => {
        const {x, y, width, height} = layout
        let smallerSize;
        if(width < height)
        {
            smallerSize = width;
        }
        else smallerSize = height;

        setImageSize(80/100 * smallerSize);
    }

    return(
        <View style={[{width:'100%', height: '100%'}, SpacingStyles.centeredContainer]} onLayout={(event) => handleSizeChange(event.nativeEvent.layout)}>
           {image === undefined ?
                (
                <TouchableOpacity style={[styles.profileImage, {width: imageSize, height: imageSize}]} onPress={handlePickPicture}>
                    <Image source={require('../../assets/randomPics/blank-profile-picture.png')} style={[SpacingStyles.centeredContainer, SpacingStyles.fullSizeContainer, styles.blankPicture]}/>
                    <Text style={{color:'white', fontSize: 18, fontWeight: '900'}}>Add Photo</Text>
                </TouchableOpacity>
                ):(
                    <TouchableOpacity style={[styles.profileImage, {width: imageSize, height: imageSize}]} onPress={handlePickPicture}>
                        <Image source={{uri: image}} style={[SpacingStyles.centeredContainer, SpacingStyles.fullSizeContainer, styles.blankPicture]}/> 
                    </TouchableOpacity>
                )
            }
        </View>
        
    );
};

export default RoundPicUpload;

const styles = StyleSheet.create({
   profileImage:{
        borderRadius: 100,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center'
   },
   blankPicture: {
       borderRadius: 100,
       position:'absolute'
   }
})