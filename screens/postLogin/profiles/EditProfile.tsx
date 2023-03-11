import React from "react";
import { View } from 'react-native'

import { EditProfilePicture } from "../../../components/profile";
import { ProfilePicList } from "../../../components/general";
import { Layout2Piece } from "../../layouts";

const EditProfile = () => {

  const getBody = () => {
    return(
      <View>
        <EditProfilePicture></EditProfilePicture>
        <ProfilePicList></ProfilePicList>
      </View>
    );
  };
  
  return (
    <Layout2Piece 
            header={ <View></View>}
            body={getBody()}
    ></Layout2Piece>
  );
};

export default EditProfile;