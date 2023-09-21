import React, { useState, useEffect } from "react";
import { View } from "react-native";
import uuid from "react-native-uuid";

import { useTheme, Text } from "react-native-paper";
import { AssignedSkill, MasteringLevel } from "../../types";
import { PlusSvg } from "../svg/general";

import Tile from "../general/Tile";
import { uiUtils, validation } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Fetch } from "../../services";
import {
  backupUser,
  deleteAssignedSkill,
  revertChangesInUser,
  updateAssignedSkill,
} from "../../redux/appState";
import { nothing } from "immer";

interface Input {
  skateProfileId: string;
  onPressAddSkill?: Function;
}
const AssignedSkillList = ({ skateProfileId, onPressAddSkill }: Input) => {
  const { user, JWTTokenResult } = useSelector(
    (state: RootState) => state.appState
  );
  const dispatch = useDispatch();
  const skateProfile = user?.skateProfiles.find(
    skateProfile => skateProfile.id === skateProfileId
  );
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    undefined
  );
  const [currentTimoutId, setCurrentTimeoutId] = useState<
    NodeJS.Timeout | undefined
  >(undefined);
  useEffect(() => {
    dispatch(backupUser());
  }, []);

  useEffect(() => {
    if (selectedIndex !== undefined) {
      if (currentTimoutId !== undefined) {
        clearTimeout(currentTimoutId);
      }
      setCurrentTimeoutId(setTimeout(() => setSelectedIndex(undefined), 3000));
    }
  }, [selectedIndex]);

  const getNextValue = (currentValue: string): string | undefined => {
    const keys = Object.keys(MasteringLevel);
    const currentIndex = keys.indexOf(currentValue);
    const nextIndex = currentIndex + 1;
    const nextKey = keys[nextIndex];
    return nextKey ? MasteringLevel[nextKey] : undefined;
  };

  const skillDelete = (skill: AssignedSkill) => {
    dispatch(backupUser());
    dispatch(deleteAssignedSkill(skill.id));

    if (
      JWTTokenResult !== undefined &&
      !validation.isJWTTokenExpired(JWTTokenResult)
    ) {
      Fetch.deleteAssignedSkill(
        JWTTokenResult.token,
        skill.id,
        skateProfileId,
        () => console.log("Assigned skill was deleted successfully"),
        () => {
          dispatch(revertChangesInUser()),
            uiUtils.showPopUp("Error", "Failed to delete assigned skill");
        }
      );
    } else {
      //TODO refresh token
    }
  };

  const advanceSkillLevel = (skill: AssignedSkill) => {
    const nextSkillLevel = getNextValue(skill.masteringLevel);
    let newMasteringLevel;
    if (nextSkillLevel === undefined) {
      newMasteringLevel = MasteringLevel.Novice;
    } else {
      newMasteringLevel = nextSkillLevel as MasteringLevel;
    }

    const updatedSkill: AssignedSkill = {
      ...skill,
      masteringLevel: newMasteringLevel,
    };

    //optimistic UI update
    dispatch(updateAssignedSkill(updatedSkill));

    //if one of this fails the state is reseted
    if (user !== undefined) {
      if (
        JWTTokenResult !== undefined &&
        !validation.isJWTTokenExpired(JWTTokenResult)
      ) {
        Fetch.putAssignedSkill(
          JWTTokenResult.token,
          updatedSkill,
          () => nothing,
          () => {
            dispatch(revertChangesInUser()),
              uiUtils.showPopUp(
                "Error",
                "Couldn't update skill level in profile"
              );
          }
        );
      } else {
        //TODO refresh token
      }
    }
  };

  const theme = useTheme();
  return (
    <View style={{ flexDirection: "row" }}>
      {onPressAddSkill !== undefined && (
        <Tile
          color={theme.colors.tertiary}
          isIcon={true}
          onPress={() => onPressAddSkill()}
        >
          <PlusSvg></PlusSvg>
        </Tile>
      )}

      {skateProfile !== undefined &&
        skateProfile.assignedSkills !== undefined &&
        skateProfile.assignedSkills !== null &&
        skateProfile.assignedSkills.map((assignedSkill, index) => {
          return (
            <Tile
              key={uuid.v4().toString()}
              color={uiUtils.getColorBasedOnSkillLevel(
                assignedSkill.masteringLevel
              )}
              withBorder={true}
              deleteEnabled={index === selectedIndex}
              onDeleteTile={() => skillDelete(assignedSkill)}
              onPress={() => advanceSkillLevel(assignedSkill)}
              onLongPress={() => setSelectedIndex(index)}
            >
              {assignedSkill.skill !== undefined &&
                assignedSkill.skill !== null && (
                  <Text>{assignedSkill.skill.name}</Text>
                )}
            </Tile>
          );
        })}
    </View>
  );
};

export default AssignedSkillList;
