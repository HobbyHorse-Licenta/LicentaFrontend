import React, { useEffect, useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";

import { Text, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { Lottie, SelectNumber } from "../../../components/general";
import { Layout2Piece } from "../../layouts";
import { Gender } from "../../../types";
import constants from "../../../assets/constants";
import {
  ProfileConfigHeader,
  SelectGender,
  SelectNameAndDescription,
} from "../../../components/profileConfig";
import {
  setAge,
  setGender,
  setName,
  setShortDescription,
} from "../../../redux/configProfileState";

const PersonalInfo = () => {
  const { age, gender, name, shortDescription } = useSelector(
    (state: any) => state.configProfile
  );

  const [finishDisabled, setFinishDisabled] = useState(true);
  const [selectedAge, setSelectedAge] = useState(age);
  const [selectedGender, setSelectedGender] = useState<Gender>(gender);
  const [choseName, setChoseName] = useState(name);
  const [description, setDescription] = useState(shortDescription);

  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    if (
      selectedGender !== undefined &&
      selectedAge !== undefined &&
      choseName !== undefined &&
      choseName !== "" &&
      description !== undefined &&
      description !== ""
    ) {
      setFinishDisabled(false);
    } else {
      setFinishDisabled(true);
    }
  }, [selectedGender, selectedAge, choseName, description]);

  useEffect(() => {
    dispatch(setGender(selectedGender));
  }, [selectedGender]);

  useEffect(() => {
    dispatch(setAge(selectedAge));
  }, [selectedAge]);

  useEffect(() => {
    dispatch(setName(choseName));
  }, [choseName]);

  useEffect(() => {
    dispatch(setShortDescription(description));
  }, [description]);

  const getBody = () => {
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.primary,
          },
        ]}
      >
        <Lottie
          lottieRequire={require("../../../assets/lottieAnimations/fingerprint.json")}
          width={70}
          height={70}
          adjustMask={15}
          maskColor={theme.colors.primary}
        />
        <Text variant="headlineLarge">Craft Your Unique Presence</Text>
        <KeyboardAvoidingView
          style={{ justifyContent: "center", alignItems: "center" }}
          behavior="padding"
        >
          <SelectNameAndDescription
            onNameChange={(name: string) => setChoseName(name)}
            onDescriptionChange={desc => setDescription(desc)}
          ></SelectNameAndDescription>

          <View style={{ flexDirection: "row" }}>
            <SelectNumber
              descriptionText="Select Age"
              value={selectedAge}
              onChange={val => setSelectedAge(val)}
              range={{
                minimumValue: constants.minimumAge,
                maximumValue: constants.maximumAge,
              }}
            ></SelectNumber>
            <SelectGender
              initialValue={gender}
              onChange={gender => setSelectedGender(gender)}
            ></SelectGender>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  };

  return (
    <Layout2Piece
      header={
        <ProfileConfigHeader
          backButton={true}
          disabled={finishDisabled}
          doneConfig={true}
        ></ProfileConfigHeader>
      }
      body={getBody()}
    ></Layout2Piece>
  );
};

export default PersonalInfo;
