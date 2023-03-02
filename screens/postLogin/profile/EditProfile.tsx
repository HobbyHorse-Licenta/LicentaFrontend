import React from "react";
import { View } from 'react-native'

import { SafeAreaView } from "react-navigation";

import { SpacingStyles } from '../../../styles'
import { EditProfilePicture } from "../../../components/profile";
import { ProfilePicList } from "../../../components/general";

const EditProfile = () => {


  return (
    <SafeAreaView style={[SpacingStyles.centeredContainer, SpacingStyles.fullSizeContainer]}>
        <View style={{width: '100%', height: '30%', backgroundColor: 'pink'}}>
            <EditProfilePicture></EditProfilePicture>
            <ProfilePicList></ProfilePicList>
        </View>
    </SafeAreaView>
  );
};

export default EditProfile;