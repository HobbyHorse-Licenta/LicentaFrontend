import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { scale, verticalScale } from "react-native-size-matters";
import uuid from "react-native-uuid";
import { Text } from "react-native-paper";
import { nothing } from "immer";

import {
  GeneralHeader,
  PrimaryContainer,
  Tile,
} from "../../../components/general";
import { SpacingStyles } from "../../../styles";
import { Layout2Piece } from "../../../screens/layouts";
import { RootState } from "../../../redux/store";
import AssignedSkillList from "../../../components/profile/AssignedSkillList";
import { Fetch } from "../../../services";
import {
  AssignedSkill,
  MasteringLevel,
  SkillRecommendation,
} from "../../../types";
import { uiUtils, validation } from "../../../utils";
import {
  addAssignedSkill,
  backupUser,
  revertChangesInUser,
  setfirstProfileConfig,
} from "../../../redux/appState";
import { COLORS } from "../../../assets/colors/colors";

const AddSkillsScreen = () => {
  const { user, JWTTokenResult } = useSelector(
    (state: RootState) => state.appState
  );
  const { currentSkateProfile } = useSelector(
    (state: RootState) => state.globalState
  );
  const [recommendedSkills, setRecommendedSkills] = useState<
    Array<SkillRecommendation> | undefined
  >(undefined);
  const [assignedSkills, setAssignedSkills] = useState<
    Array<AssignedSkill> | undefined
  >(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentSkateProfile !== undefined) {
      ///get recomended skills for the skateProfile shown in modal
      if (
        JWTTokenResult !== undefined &&
        !validation.isJWTTokenExpired(JWTTokenResult)
      ) {
        Fetch.getSkillRecommendations(
          JWTTokenResult.token,
          currentSkateProfile.skatePracticeStyle,
          currentSkateProfile.skateExperience,
          skills =>
            setRecommendedSkills(
              removeAssignedSkillsFromRecommendations(skills)
            ),
          () =>
            console.log("Coudn't get recommended skills for the shown profile")
        );
      } else {
        //TODO refresh token
      }
    } else {
      setRecommendedSkills(undefined);
    }
  }, [currentSkateProfile]);

  useEffect(() => {
    if (currentSkateProfile !== undefined && user !== undefined) {
      const updatedCurrentSkateProfile = user.skateProfiles.find(
        sk => sk.id === currentSkateProfile.id
      );
      if (updatedCurrentSkateProfile !== undefined) {
        setAssignedSkills(updatedCurrentSkateProfile.assignedSkills);
      }
    }
  }, [user]);

  useEffect(() => {
    setRecommendedSkills(
      removeAssignedSkillsFromRecommendations(recommendedSkills)
    );

    if (
      currentSkateProfile !== undefined &&
      JWTTokenResult !== undefined &&
      !validation.isJWTTokenExpired(JWTTokenResult)
    ) {
      //trying to actually bring the initial recommended list
      Fetch.getSkillRecommendations(
        JWTTokenResult.token,
        currentSkateProfile.skatePracticeStyle,
        currentSkateProfile.skateExperience,
        skills =>
          setRecommendedSkills(removeAssignedSkillsFromRecommendations(skills)),
        () =>
          console.log("Coudn't get recommended skills for the shown profile")
      );
    }
  }, [assignedSkills]);

  const getRecommendedSkillsElements = () => {
    if (recommendedSkills !== undefined && recommendedSkills.length > 0) {
      return recommendedSkills.map((recommendedSkill, index) => {
        return {
          id: index,
          element: (
            <Tile
              color="white"
              key={uuid.v4().toString()}
              onPress={() => addSkill(recommendedSkill)}
            >
              <Text style={{ flexWrap: "nowrap" }}>
                {recommendedSkill.skill.name}
              </Text>
            </Tile>
          ),
        };
      });
    }
  };

  const addSkill = (recommendedSkill: SkillRecommendation) => {
    if (currentSkateProfile !== undefined) {
      //add recommended skill to assigned skills in curent skate profile, mastering level should be novice
      const newAssignedSkill: AssignedSkill = {
        id: uuid.v4().toString(),
        skillId: recommendedSkill.skill.id,
        skateProfileId: currentSkateProfile.id,
        masteringLevel: MasteringLevel.Novice,
      };

      const skillForOptimisticUpdate: AssignedSkill = {
        skill: recommendedSkill.skill,
        ...newAssignedSkill,
      };

      if (user !== undefined) {
        if (
          JWTTokenResult !== undefined &&
          !validation.isJWTTokenExpired(JWTTokenResult)
        ) {
          dispatch(backupUser());
          dispatch(addAssignedSkill(skillForOptimisticUpdate));

          Fetch.postAssignedSkill(
            JWTTokenResult.token,
            newAssignedSkill,
            () => nothing,
            () => {
              dispatch(revertChangesInUser());
              uiUtils.showPopUp(
                "Error",
                "Coudn't add skill to current skating profile"
              );
            }
          );
        } else {
          //TODO refresh token
        }
      }
    }
  };

  const removeAssignedSkillsFromRecommendations = (
    recomSkills: Array<SkillRecommendation> | undefined
  ) => {
    //all recommended skills that are not already assigned to the skateprofile
    return recomSkills?.filter(recommendedSkill => {
      if (
        currentSkateProfile !== undefined &&
        assignedSkills !== undefined &&
        assignedSkills !== null
      ) {
        if (
          assignedSkills.find(
            assignedSkill =>
              assignedSkill.skill !== undefined &&
              assignedSkill.skill.id === recommendedSkill.skill.id
          ) !== undefined
        ) {
          return false;
        } else {
          return true;
        }
      }
      return true;
    });
  };

  const getSelectionList = () => {
    const suggestedSkills = getRecommendedSkillsElements();
    if (currentSkateProfile !== undefined) {
      return (
        <View style={styles.skillContainerSize}>
          <Text variant="bodyMedium" style={{ textAlign: "center" }}>
            Skills recommended for {currentSkateProfile.skateExperience} level
            in {currentSkateProfile.skatePracticeStyle}
          </Text>
          <ScrollView
            contentContainerStyle={[
              {
                justifyContent: "center",
                alignItems: "center",
                margin: scale(10),
              },
            ]}
          >
            <View
              style={{
                width: "100%",
                height: "100%",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {suggestedSkills !== undefined &&
                suggestedSkills.map(renderElement => renderElement.element)}
            </View>
          </ScrollView>
        </View>
      );
    } else {
      return null;
    }
  };

  const getCurrentSkills = () => {
    if (currentSkateProfile !== undefined) {
      return (
        <View style={styles.skillContainerSize}>
          <Text variant="bodyMedium" style={{ textAlign: "center" }}>
            Current Skills
          </Text>
          <View style={{ margin: scale(10) }}>
            <ScrollView
              horizontal={true}
              contentContainerStyle={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AssignedSkillList
                skateProfileId={currentSkateProfile.id}
              ></AssignedSkillList>
            </ScrollView>
          </View>
        </View>
      );
    }
  };
  const getBody = () => {
    return (
      <View style={[StyleSheet.absoluteFill, SpacingStyles.centeredContainer]}>
        <PrimaryContainer styleInput={{ width: "90%", height: "97%" }}>
          <View
            style={[
              { marginBottom: verticalScale(3) },
              SpacingStyles.centeredContainer,
            ]}
          >
            <Text
              variant="headlineSmall"
              style={{ marginBottom: verticalScale(20) }}
            >
              Skate Skill Spotlight
            </Text>
            <Text variant="bodyLarge" style={{ textAlign: "center" }}>
              Select specific training skate skills to showcase your current
              focus
            </Text>
            <Text variant="bodyLarge" style={{ textAlign: "center" }}>
              By doing so, others can gain insight into your ongoing training
              endeavors and witness the progression of your abilities
            </Text>
          </View>
          {currentSkateProfile !== undefined && getCurrentSkills()}
          {recommendedSkills !== undefined &&
            recommendedSkills.length > 0 &&
            getSelectionList()}
        </PrimaryContainer>
      </View>
    );
  };

  return (
    <Layout2Piece
      header={
        <GeneralHeader
          rightButtonText="Skip/Next"
          onRightButtonPress={() => dispatch(setfirstProfileConfig(false))}
        ></GeneralHeader>
      }
      body={getBody()}
    ></Layout2Piece>
  );
};

export default AddSkillsScreen;

const styles = StyleSheet.create({
  skillContainerSize: {
    width: scale(290),
    height: verticalScale(170),
    borderRadius: 20,
    padding: scale(10),
    margin: scale(5),
    backgroundColor: COLORS.aBackground,
  },
});
