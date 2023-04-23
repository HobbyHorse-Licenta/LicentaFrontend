import React, { useState} from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import {Text} from 'react-native-paper'

import { SpacingStyles } from '../../styles';
import { Fetch, ImageService } from '../../services';


interface Input {
    image: string | undefined | null,
    onChange?: Function
}
/**
 * Wrap in PrimaryContainer with styles.picContainer
 */
const RoundPicture = ({image, onChange} : Input) => {
    const [imageSize, setImageSize] = useState<number>(0);

    const handlePickPicture = async () => {
        
        console.log("add profile picture");
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [3, 3],
          quality: 1,
          base64: true
        });

 
        if (!result.canceled) {
            const base64Image = result.assets[0].base64;

            ImageService.postPictureToImgur(base64Image,
            (postedImageUrl) => {onChange !== undefined && onChange(postedImageUrl); console.log("IMAGE URL: " + postedImageUrl)},
            (errorMessage) => console.log(errorMessage));
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
           {(image === undefined || image === null) ?
                (
                <TouchableOpacity style={[styles.profileImage, {width: imageSize, height: imageSize}]} onPress={() => onChange !== undefined && handlePickPicture()}>
                    <Image source={require('../../assets/randomPics/blank-profile-picture.png')} style={[SpacingStyles.centeredContainer, SpacingStyles.fullSizeContainer, styles.blankPicture]}/>
                    {onChange !== undefined && <Text style={{color:'white', fontSize: 18, fontWeight: '900'}}>Add Photo</Text>}
                </TouchableOpacity>
                ):(
                    <TouchableOpacity style={[styles.profileImage, {width: imageSize, height: imageSize}]} onPress={() => onChange !== undefined && handlePickPicture()}>
                        <Image source={{uri: image}} style={[SpacingStyles.centeredContainer, SpacingStyles.fullSizeContainer, styles.blankPicture]}/> 
                    </TouchableOpacity>
                )
            }
        </View>
        
    );
};

export default RoundPicture;

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