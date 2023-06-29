import React, { useState} from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import {Text} from 'react-native-paper'

import { SpacingStyles } from '../../styles';
import { ImageService } from '../../services';
import { blankProfilePictureUrl } from '../../assets/imageUrls';

interface Input {
    image: string | undefined | null,
    onChange?: (url: string) => void,
    onLoadingStatusChange?: (status: boolean) => void,
    /** should be between 1 and 2 */
    ratio: number 
}
/**
 * Wraps in a PrimaryContainer and gets its size 
 */
const RectangularPicture = ({image, onChange, ratio, onLoadingStatusChange} : Input) => {
    let _ratio;
    if(ratio !== undefined && ratio >= 1 && ratio < 2)
        _ratio = ratio
    else _ratio = 1.8
    const [imageSize, setImageSize] = useState<number>(0);

    const handlePickPicture = async () => {
        
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4 * _ratio, 4],
          quality: 1,
          base64: true
        });

        

        if (!result.canceled) {
            if(onLoadingStatusChange !== undefined)
                onLoadingStatusChange(true);
            const base64Image = result.assets[0].base64;

            ImageService.postPictureToImgur(base64Image,
            (postedImageUrl) => {
                if(onLoadingStatusChange !== undefined)
                    onLoadingStatusChange(false);
                onChange !== undefined && onChange(postedImageUrl);
            },
            (errorMessage) => {
                if(onLoadingStatusChange !== undefined)
                    onLoadingStatusChange(false);
                console.log(errorMessage)
            });
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
                <TouchableOpacity style={[styles.profileImage, {width: imageSize * _ratio, height: imageSize}]} onPress={() => onChange !== undefined && handlePickPicture()}>
                    <Image source={{uri: blankProfilePictureUrl}} style={[SpacingStyles.centeredContainer, SpacingStyles.fullSizeContainer, styles.blankPicture]}/>
                    {onChange !== undefined && <Text style={{color:'white', fontSize: 18, fontWeight: '900'}}>Add Photo</Text>}
                </TouchableOpacity>
                ):(
                    <TouchableOpacity style={[styles.profileImage, {width: imageSize * _ratio, height: imageSize}]} onPress={() => onChange !== undefined && handlePickPicture()}>
                        <Image source={{uri: image}} style={[SpacingStyles.centeredContainer, SpacingStyles.fullSizeContainer, styles.blankPicture]}/> 
                    </TouchableOpacity>
                )
            }
        </View>
        
    );
};

export default RectangularPicture;

const styles = StyleSheet.create({
   profileImage:{
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center'
   },
   blankPicture: {
       position:'absolute'
   }
})