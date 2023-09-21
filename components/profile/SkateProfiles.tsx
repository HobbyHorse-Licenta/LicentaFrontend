import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  ViewStyle,
} from "react-native";

import { Text, useTheme } from "react-native-paper";
import { scale, verticalScale } from "react-native-size-matters";
import { useDispatch } from "react-redux";
import { useTourGuideController } from "rn-tourguide";
import uuid from "react-native-uuid";

import { setAddingSkateProfile } from "../../redux/appState";
import { resetConfigProfileState } from "../../redux/configProfileState";
import { SpacingStyles } from "../../styles";
import { SkatePracticeStyles, SkateProfile } from "../../types";
import {
  GeneralModal,
  HorizontalTextScroll,
  PrimaryContainer,
  SvgView,
} from "../general";
import { PlusSvg } from "../svg/general";
import SkateProfileSummary from "./SkateProfileSummary";
import SkateProfileSummaryWithSkills from "./SkateProfileSummaryWithSkills";

interface Input {
  profiles: Array<SkateProfile>;
  value: SkateProfile | undefined;
  onValueChange: Function;
  addEnabled?: boolean;
  holdFeatureEnabled?: boolean;
  style?: ViewStyle;
}

const SkateProfiles = ({
  profiles,
  value,
  onValueChange,
  addEnabled,
  holdFeatureEnabled,
  style,
}: Input) => {
  const [heldProfile, setHeldProfile] = useState<SkateProfile | undefined>();

  const theme = useTheme();
  const dispatch = useDispatch();

  const { canStart, start, TourGuideZone } =
    useTourGuideController("heldskateProfile");

  useEffect(() => {
    if (heldProfile !== undefined) {
      if (canStart) {
        start();
      }
    }
  }, [heldProfile]);

  const getStyle = () => {
    if (style !== undefined) {
      return { ...styles.mainContainer, ...style };
    } else {
      return { ...styles.mainContainer, height: "auto" };
    }
  };

  const getModalInfo = () => {
    if (heldProfile !== undefined) {
      return (
        <TourGuideZone zone={1} text={`Here you can add new skills`}>
          <SkateProfileSummaryWithSkills
            skateProfileId={heldProfile.id}
          ></SkateProfileSummaryWithSkills>
        </TourGuideZone>
      );
    } else {
      return <Text>No info to display</Text>;
    }
  };

  const addNewSkateProfile = () => {
    dispatch(resetConfigProfileState());
    dispatch(setAddingSkateProfile(true));
  };

  const checkIfSelected = (
    skateProfile1: SkateProfile | undefined,
    skateProfile2: SkateProfile | undefined
  ) => {
    if (skateProfile1 !== undefined && skateProfile2 !== undefined) {
      return skateProfile1.id === skateProfile2.id;
    } else {
      return false;
    }
  };

  return (
    <PrimaryContainer styleInput={{ ...getStyle(), overflow: "hidden" }}>
      <Text variant="headlineSmall">Skate Profiles</Text>
      {holdFeatureEnabled === true && (
        <HorizontalTextScroll
          duration={10}
          text={"Add training skills by holding a skating profile"}
        />
      )}
      {profiles != undefined && (
        <View
          style={{
            height:
              SpacingStyles.skateProfileSummary.height + verticalScale(20),
            width: "106%",
          }}
        >
          <ScrollView style={{ marginVertical: scale(5) }} horizontal={true}>
            {profiles.length < Object.keys(SkatePracticeStyles).length &&
              addEnabled === true && (
                <Pressable onPress={() => addNewSkateProfile()}>
                  <PrimaryContainer
                    styleInput={{
                      ...SpacingStyles.skateProfileSummary,
                      ...{
                        backgroundColor: theme.colors.background,
                        borderColor: theme.colors.tertiary,
                      },
                    }}
                  >
                    <SvgView size="small">
                      <PlusSvg></PlusSvg>
                    </SvgView>
                  </PrimaryContainer>
                </Pressable>
              )}
            {profiles.map(skateProfile => {
              return (
                <SkateProfileSummary
                  key={uuid.v4().toString()}
                  onLongPress={() => {
                    if (holdFeatureEnabled === true) {
                      setHeldProfile(skateProfile);
                    }
                  }}
                  onPress={() => onValueChange(skateProfile)}
                  selected={checkIfSelected(value, skateProfile)}
                  info={skateProfile}
                ></SkateProfileSummary>
              );
            })}
          </ScrollView>
        </View>
      )}
      <GeneralModal
        visible={heldProfile !== undefined}
        onDismiss={() => {
          setHeldProfile(undefined);
        }}
      >
        {getModalInfo()}
      </GeneralModal>
    </PrimaryContainer>
  );
};

export default SkateProfiles;

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: scale(8),
    margin: scale(3),
  },
});
