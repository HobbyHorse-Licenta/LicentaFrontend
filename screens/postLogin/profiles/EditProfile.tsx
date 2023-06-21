import React, {useState, useEffect} from "react";
import { View, StyleSheet, Image } from 'react-native'

import { scale, verticalScale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import {Text, TextInput, useTheme } from 'react-native-paper'

import { EditProfileHeader, MyProfileHeader } from "../../../components/profile";
import { GeneralHeader, PrimaryContainer, RoundPicture, SelectNumber } from "../../../components/general";
import { Layout2Piece } from "../../layouts";
import { RootState } from "../../../redux/store";
import { validation } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import { verifyBeforeUpdateEmail } from "firebase/auth";
import { SpacingStyles } from "../../../styles";
import {User} from '../../../types'
import { Fetch } from "../../../services";
import { setUser } from "../../../redux/appState";
import constants from "../../../assets/constants";

const EditProfile = () => {

  const {user, JWTTokenResult} = useSelector((state: RootState) => state.appState)
  const [editedName, setEditedName] = useState<string>(user !== undefined ? user.name : "");
  const [editedAge, setEditedAge] = useState(user !== undefined ? user.age : 0)
  const [editedImage, setEditedImage] = useState(user !== undefined ? user.profileImageUrl : undefined)
  const theme = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const updateName = (typedName: string) => {
    if(validation.validateName(typedName) || typedName === '')
    setEditedName(typedName);
    else setEditedName(previousText => previousText);
  }

  useEffect(() => {
    console.log("Selected iamge in edit " + editedImage);
  }, [editedImage])
  
  const finishedProfileEdit = () => {
    if(user !== undefined && editedName !== undefined && editedName !== null && editedAge !== undefined && editedAge !== null)
    {
      const editedUser: User = {
        ...user, name: editedName, age: editedAge, profileImageUrl: editedImage
      }
      console.log("ID: " + user.id);
      console.log("Edited user: " + JSON.stringify(editedUser))
      if(JWTTokenResult !== undefined && !validation.isJWTTokenExpired(JWTTokenResult))
      {
        Fetch.putUser(JWTTokenResult.token, user.id, editedUser, 
        (updatedUser) => {dispatch(setUser(updatedUser))},
        () => console.log("Coudn't update user after profile edit"));
      }
      else{
          //TODO refresh token
      }
      
    }
    navigation.goBack();
  }
 
  const getBody = () => {
    return(
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
      {
        (user !== undefined) ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <PrimaryContainer styleInput={SpacingStyles.profilePicContainer}>
                <RoundPicture  image={editedImage} onChange={(imgUrl) => setEditedImage(imgUrl)}></RoundPicture>
            </PrimaryContainer>   
            <TextInput
                style={[styles.nameInput, {backgroundColor: theme.colors.primary}]}
                label="Write your name"
                selectionColor={theme.colors.tertiary}
                value={editedName}
                onChangeText={updateName}
                />
            <SelectNumber value={editedAge} onChange={(val) => setEditedAge(val)} range={{minimumValue: constants.minimumAge, maximumValue: constants.maximumAge}} descriptionText={'Select Age'}></SelectNumber>
            <View style={{width: scale(100), height: verticalScale(40)}}>
            </View>
          </View>
        )
        :
        (
          <Text>No user to edit</Text>
        )
      }
      </View>
    );
  };
  
  return (
    <Layout2Piece
            header={ <GeneralHeader onBack={() => navigation.goBack()}
            onRightButtonPress={() => finishedProfileEdit()} rightButtonText={"Done"}></GeneralHeader>}
            body={getBody()}
    ></Layout2Piece>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  nameInput: {
    width: scale(250),
    margin: verticalScale(20),
  }
});