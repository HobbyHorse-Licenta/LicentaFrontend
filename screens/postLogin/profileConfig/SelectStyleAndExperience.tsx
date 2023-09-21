import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, TextStyle } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { scale, verticalScale } from "react-native-size-matters";
import { Text, useTheme } from "react-native-paper";
import uuid from "react-native-uuid";

import { PrimaryContainer, SvgView } from "../../../components/general";
import {
  SkateExperience,
  SkatePracticeStyles,
  SkatesType,
} from "../../../types";
import { SpacingStyles } from "../../../styles";
import { Layout2Piece } from "../../layouts";
import { ProfileConfigHeader } from "../../../components/profileConfig";
import {
  setSkatePracticeStyle,
  setSkateExperience,
} from "../../../redux/configProfileState";
import { HandDownSvg } from "../../../components/svg/general";
import { RootState } from "../../../redux/store";

const SelectStyleAndExperience = () => {
  const { addingSkateProfile, user } = useSelector(
    (state: RootState) => state.appState
  );
  const { skateType } = useSelector((state: any) => state.configProfile);
  const { skatePracticeStyle } = useSelector(
    (state: any) => state.configProfile
  );
  const { skateExperience } = useSelector((state: any) => state.configProfile);
  const [selectedSkateStyle, setSelectedSkateStyle] = useState<
    SkatePracticeStyles | undefined
  >(skatePracticeStyle);
  const [selectedExperience, setSelectedExperience] = useState<
    SkateExperience | undefined
  >(skateExperience);
  const [goNextDisabled, setGoNextDisabled] = useState(true);
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    dispatch(setSkatePracticeStyle(selectedSkateStyle));

    if (selectedSkateStyle != undefined && selectedExperience != undefined) {
      setGoNextDisabled(false);
    }
  }, [selectedSkateStyle]);

  useEffect(() => {
    dispatch(setSkateExperience(selectedExperience));

    if (selectedSkateStyle != undefined && selectedExperience != undefined) {
      setGoNextDisabled(false);
    }
  }, [selectedExperience]);

  const getPracticeStyleOptions = () => {
    let stylesArray: Array<string>;
    switch (skateType) {
      case SkatesType.AggressiveSkates:
        stylesArray = [
          SkatePracticeStyles.AggresiveSkating,
          SkatePracticeStyles.CasualSkating,
        ];
        break;
      case SkatesType.CasualSkates:
        stylesArray = [
          SkatePracticeStyles.CasualSkating,
          SkatePracticeStyles.AggresiveSkating,
          SkatePracticeStyles.SpeedSkating,
        ];
        break;
      case SkatesType.SpeedSkates:
        stylesArray = [
          SkatePracticeStyles.SpeedSkating,
          SkatePracticeStyles.CasualSkating,
        ];
        break;

      default:
        stylesArray = [
          SkatePracticeStyles.CasualSkating,
          SkatePracticeStyles.AggresiveSkating,
          SkatePracticeStyles.SpeedSkating,
        ];
        break;
    }
    if (addingSkateProfile === true) {
      const alreadyUsedStyles = user?.skateProfiles.map(
        profile => profile.skatePracticeStyle
      );
      if (alreadyUsedStyles !== undefined && alreadyUsedStyles.length > 0) {
        stylesArray = stylesArray.filter(style => {
          return alreadyUsedStyles.find(s => s === style) === undefined;
        });
      }
    }

    if (stylesArray !== undefined && stylesArray.length > 0) {
      return (
        <View>
          {stylesArray.map((style, index) => {
            const enumStyle = stringToEnum(style);
            return (
              <View key={uuid.v4().toString()}>
                {index != 0 && (
                  <View
                    style={{
                      backgroundColor: "lightgrey",
                      width: "100%",
                      height: 1,
                    }}
                  ></View>
                )}
                <Pressable
                  onPress={() => setSelectedSkateStyle(enumStyle)}
                  style={{ ...styles.skateStylesPressable, width: scale(180) }}
                >
                  <Text style={getSkatePracticeTextStyle(enumStyle)}>
                    {enumStyle}
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </View>
      );
    } else {
      return null;
    }
  };

  const stringToEnum = (str: string) => {
    switch (str) {
      case SkatePracticeStyles.AggresiveSkating:
        return SkatePracticeStyles.AggresiveSkating;
        break;
      case SkatePracticeStyles.CasualSkating:
        return SkatePracticeStyles.CasualSkating;
        break;
      case SkatePracticeStyles.SpeedSkating:
        return SkatePracticeStyles.SpeedSkating;
        break;
      default:
        return SkatePracticeStyles.CasualSkating;
    }
  };
  const getSkatePracticeTextStyle = (
    practiceStyle: SkatePracticeStyles
  ): TextStyle => {
    const defaultStyle = {
      marginHorizontal: scale(10),
      marginVertical: scale(20),
    };
    if (practiceStyle === selectedSkateStyle) {
      return { ...defaultStyle, color: theme.colors.tertiary };
    } else {
      return defaultStyle;
    }
  };

  const getExperinceTextStyle = (experience: SkateExperience) => {
    const defaultStyle = { margin: scale(10) };
    if (experience === selectedExperience) {
      return { ...defaultStyle, color: theme.colors.tertiary };
    } else {
      return defaultStyle;
    }
  };

  const getExperienceOptions = () => {
    const experienceValues = Object.values(SkateExperience);
    return (
      <View style={[StyleSheet.absoluteFill, styles.optionView]}>
        {experienceValues.map((experienceLevel, index) => {
          return (
            <View
              key={uuid.v4().toString()}
              style={[
                { width: "100%", flex: 1 },
                SpacingStyles.centeredContainer,
              ]}
            >
              {index != 0 && (
                <View
                  style={{
                    backgroundColor: "lightgrey",
                    width: "100%",
                    height: 1,
                  }}
                ></View>
              )}
              <Pressable
                onPress={() => setSelectedExperience(experienceLevel)}
                style={styles.experinceTextView}
              >
                <Text style={getExperinceTextStyle(experienceLevel)}>
                  {experienceLevel}
                </Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    );
  };

  const practiceStyleOptions = getPracticeStyleOptions();
  const getBody = () => {
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text variant="headlineSmall">What do you want to pratice?</Text>
        <View style={styles.handIcon}></View>
        <SvgView size="big">
          <HandDownSvg></HandDownSvg>
        </SvgView>
        {practiceStyleOptions !== null && (
          <PrimaryContainer
            styleInput={{
              ...SpacingStyles.shadow,
              ...{ justifyContent: "space-evenly" },
            }}
          >
            {practiceStyleOptions}
          </PrimaryContainer>
        )}
        <PrimaryContainer
          styleInput={{ ...SpacingStyles.shadow, ...styles.experienceOptions }}
        >
          {getExperienceOptions()}
        </PrimaryContainer>
      </View>
    );
  };

  return (
    <View>
      {addingSkateProfile === true ? (
        <Layout2Piece
          header={
            <ProfileConfigHeader
              disabled={goNextDisabled}
              backButton={true}
              doneConfig={true}
            />
          }
          body={getBody()}
        ></Layout2Piece>
      ) : (
        <Layout2Piece
          header={
            <ProfileConfigHeader
              disabled={goNextDisabled}
              backButton={true}
              nextScreen={"PersonalInfo"}
            />
          }
          body={getBody()}
        ></Layout2Piece>
      )}
    </View>
  );
};

export default SelectStyleAndExperience;

const styles = StyleSheet.create({
  experienceOptions: {
    height: verticalScale(200),
    width: scale(210),
    margin: scale(10),
    padding: scale(20),
  },
  handIcon: {
    height: verticalScale(50),
    width: scale(50),
    margin: scale(10),
  },
  experinceTextView: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  skateStylesPressable: {
    paddingHorizontal: scale(5),
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  optionView: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 1,
  },
});
