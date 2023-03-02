import React from 'react'
import { View } from 'react-native';

import { SpacingStyles } from '../../styles';
import RoundPicUpload from '../general/RoundPicUpload';

const EditProfilePicture = () => {
    return(
        <View style={[{width: '100%', height: '100%'}, SpacingStyles.centeredContainer]}>
           <RoundPicUpload></RoundPicUpload>
        </View>
        
    );
};

export default EditProfilePicture;
