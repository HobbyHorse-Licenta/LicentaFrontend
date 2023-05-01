import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable} from 'react-native'

import { scale } from "react-native-size-matters";
import {useTheme, Text} from 'react-native-paper'

import { GeneralHeader, GeneralModal, PrimaryContainer, RoundPicture } from "../../../components/general";
import {MyProfileHeader, SkateProfiles } from "../../../components/profile";
import { Layout2PieceForNavigator } from "../../layouts";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../../types";
import { useNavigation } from "@react-navigation/native";
import { authenticationUtils } from "../../../utils";
import { SpacingStyles } from "../../../styles";
import { setCurrentSkateProfile } from "../../../redux/appState";
import { RootState } from "../../../redux/store";

const MyProfile = () => {
  const {age, name, skateProfiles, profileImageUrl, gender} = useSelector((state: any) => state.appState.user)
  const {currentSkateProfile} = useSelector((state: RootState) => state.appState)
  const theme = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Current profile: " + JSON.stringify(currentSkateProfile));
  }, [currentSkateProfile])
  

  const getBody = () => {
    return(
      <View style={{justifyContent:'center', alignItems: 'center'}}>
        <PrimaryContainer styleInput={{...styles.profileContainer, ...{backgroundColor: theme.colors.secondary}}}>
          <PrimaryContainer styleInput={SpacingStyles.profilePicContainer}>
            {
              profileImageUrl !== undefined ? (
                <RoundPicture image={profileImageUrl}></RoundPicture>
              ):
              (
                <RoundPicture image={undefined}></RoundPicture>
              )
            }
          </PrimaryContainer>
          <View style={styles.infoContainer}>
            <Text variant="titleLarge">{name}</Text>
            <Text variant="titleMedium">Age: {age}</Text>
            <Text variant="titleMedium">Gender: {gender}</Text>
          </View>
        </PrimaryContainer>
        
        <SkateProfiles profiles={skateProfiles} value={currentSkateProfile} addEnabled={true} holdFeatureEnabled={true}
        onValueChange={(profile) => {dispatch(setCurrentSkateProfile(profile))}}></SkateProfiles>

      </View>
    );
  };
  
  return (
    <Layout2PieceForNavigator 
            header={
            <GeneralHeader title="My Profile" 
            menuItems={[
              {text: 'Edit', function: () => navigation.navigate('EditProfile' as never)},
              {text: 'Logout', function: () => authenticationUtils.logOut()}
            ]}
            ></GeneralHeader>}
            body={getBody()}
    ></Layout2PieceForNavigator>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
    profileContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      width: scale(300),
      padding: scale(10)
    },
    infoContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: scale(200),
      height: scale(100),
    }
})