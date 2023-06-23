import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable} from 'react-native'

import { scale, verticalScale } from "react-native-size-matters";
import {useTheme, Text} from 'react-native-paper'

import { FemaleOption, GeneralHeader, GeneralModal, MaleOption, PrimaryContainer, RoundPicture } from "../../../components/general";
import {MyProfileHeader, SkateProfiles } from "../../../components/profile";
import { Layout2PieceForNavigator } from "../../layouts";
import { useDispatch, useSelector } from "react-redux";
import { Gender, User } from "../../../types";
import { useNavigation } from "@react-navigation/native";
import { authenticationUtils, uiUtils } from "../../../utils";
import { SpacingStyles } from "../../../styles";
import { setCurrentSkateProfile } from "../../../redux/appState";
import { RootState } from "../../../redux/store";
import {SMILING_FACE_WITH_OPEN_MOUTH} from "../../../assets/emotes"
import { TourGuideZoneByPosition, useTourGuideController } from "rn-tourguide";
import { setMyProfileWalkthrough } from "../../../redux/walkthroughState";

const MyProfile = () => {
  const [skipWalkthroughPromptVisibility, setSkipWalkthroughPromptVisibility] = useState(false);
  const {user}= useSelector((state: RootState) => state.appState);
  const {currentSkateProfile} = useSelector((state: RootState) => state.appState)
  const {myProfile} = useSelector((state: RootState) => state.walkthroughState)
  const theme = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  //////FOR WALKTHROUGH////
  const {
    canStart, // a boolean indicate if you can start tour guide
    start, // a function to start the tourguide
    stop, // a function  to stopping it
    eventEmitter, // an object for listening some events
    TourGuideZone
  } = useTourGuideController('myProfile')

  useEffect(() => {
      if (canStart && myProfile === true) {
        start()
      }
      if(eventEmitter !== undefined)
      {
        eventEmitter.on('stop', () => setSkipWalkthroughPromptVisibility(true))
      }

      return () => {
        if(eventEmitter !== undefined)
        {
            eventEmitter.off('stop', () => setSkipWalkthroughPromptVisibility(true))
        }
      }
  }, [canStart])
  
  const userInfo = () => {
    const genderOptionColor = theme.colors.background;
    if(user !== undefined)
    return(
      <PrimaryContainer styleInput={{...styles.profileContainer, ...styles.containerSize}}>
        <PrimaryContainer styleInput={SpacingStyles.profilePicContainer}>
          <RoundPicture image={user.profileImageUrl}></RoundPicture>
        </PrimaryContainer>
        <View style={styles.infoContainer}>
          <Text style={{fontWeight: 'bold'}} variant="titleLarge">{user.name}</Text>
          <Text variant="titleMedium">Age: {user.age}</Text>
          {
            user.gender === Gender.Male ? (
                <MaleOption color={genderOptionColor}></MaleOption>
            )
            :(
                <FemaleOption color={genderOptionColor}></FemaleOption>
            )
          }
        </View>
      </PrimaryContainer>
    )
  }

  const skateProfiles = () => {
    if(user !== undefined)
    return(
      <TourGuideZone
      zone={1} text={`Hold skate profile to see its assigned skills ${SMILING_FACE_WITH_OPEN_MOUTH}`}
      tooltipBottomOffset={-50}>

      <SkateProfiles style={styles.containerSize} profiles={user.skateProfiles} value={currentSkateProfile} addEnabled={true} holdFeatureEnabled={true}
      onValueChange={(profile) => {dispatch(setCurrentSkateProfile(profile))}}></SkateProfiles>
      </TourGuideZone>
    )
  }

  const userDescription = () => {
    if(user !== undefined)
    return(
      <PrimaryContainer styleInput={styles.containerSize}>
        <Text style={{fontWeight: 'bold', marginBottom: verticalScale(10)}} variant="headlineSmall">Short Description</Text>
        <View style={[styles.shortDescription, {backgroundColor: theme.colors.background}]}>
        <Text style={{textAlign: "center"}}>{user.shortDescription}</Text>
        </View>
      </PrimaryContainer>
    )
  }

  const getBody = () => {
    if(user !== undefined)
      return(
        <View style={{justifyContent:'center', alignItems: 'center'}}>
          
          {userInfo()}

          {skateProfiles()}
         
          {userDescription()}

          {uiUtils.getShowWalkthroughModal(skipWalkthroughPromptVisibility, (visibility) => setSkipWalkthroughPromptVisibility(visibility),
                                                () => dispatch(setMyProfileWalkthrough(false)))}
          
        </View>
      );
    else return (
      <View>
        <Text>No user to display info for</Text>
      </View>
    )
  };
  
  return (
    <Layout2PieceForNavigator 
            header={
            <GeneralHeader title="My Profile" 
            menuItems={[
              {text: 'Edit Profile', function: () => navigation.navigate('EditProfile' as never)},
              {text: 'Logout', function: () => authenticationUtils.logOut()}
            ]}
            ></GeneralHeader>}
            body={getBody()}
    ></Layout2PieceForNavigator>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
    containerSize: {
      width: scale(300),
      margin: scale(10)
    },
    profileContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      width: scale(300),
      padding: scale(10),
      margin: scale(20)
    },
    infoContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: scale(200),
    },
    shortDescription: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: scale(10),
      paddingVertical: scale(20),
      borderRadius: 10
    }
})