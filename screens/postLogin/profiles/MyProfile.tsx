import React from "react";
import { View, Text, StyleSheet} from 'react-native'

import { scale } from "react-native-size-matters";

import { PrimaryContainer } from "../../../components/general";
import { EditProfilePicture, MyProfileHeader, SkateProfiles } from "../../../components/profile";
import { Layout2PieceForNavigator } from "../../layouts";

const MyProfile = () => {

  const getBody = () => {
    return(
      <View>
        <PrimaryContainer styleInput={styles.profileContainer}>
          <EditProfilePicture></EditProfilePicture>
        </PrimaryContainer>
        <SkateProfiles></SkateProfiles>
      </View>
    );
  };
  
  return (
    <Layout2PieceForNavigator 
            header={<MyProfileHeader>My Profile</MyProfileHeader>}
            body={getBody()}
    ></Layout2PieceForNavigator>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
    profileContainer: {
        width: scale(100),
        height: scale(100),
        padding: scale(1)
    }
})