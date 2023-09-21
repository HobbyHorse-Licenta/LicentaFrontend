import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";

import { Text } from "react-native-paper";
import { scale, verticalScale } from "react-native-size-matters";
import { useDispatch } from "react-redux";
import * as Animatable from "react-native-animatable";

import { Layout2Piece } from "../../layouts";
import { SpacingStyles } from "../../../styles";
import { InlineSkatesSvg } from "../../../components/svg/sports";
import { resetConfigProfileState } from "../../../redux/configProfileState";
import { ProfileConfigHeader } from "../../../components/profileConfig";
import { setfirstProfileConfig } from "../../../redux/appState";

const Intro = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetConfigProfileState());
    dispatch(setfirstProfileConfig(true));
  }, []);

  const getBody = () => {
    return (
      <View style={[StyleSheet.absoluteFill, SpacingStyles.centeredContainer]}>
        <View
          style={[
            { marginBottom: verticalScale(60) },
            SpacingStyles.centeredContainer,
          ]}
        >
          <Animatable.View
            animation="pulse"
            iterationCount={Infinity}
            duration={3000}
          >
            <View
              style={{
                width: 170,
                height: 170,
                marginBottom: verticalScale(60),
              }}
            >
              <InlineSkatesSvg></InlineSkatesSvg>
            </View>
          </Animatable.View>

          <View style={{ margin: scale(20) }}>
            <Text
              variant="headlineMedium"
              style={{ marginBottom: verticalScale(5), textAlign: "center" }}
            >
              Profile configuration
            </Text>
            <Text variant="labelLarge" style={{ textAlign: "center" }}>
              There is some setup involved so we can provide you with the best
              skating experience
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Layout2Piece
      header={
        <ProfileConfigHeader
          backButton={false}
          disabled={false}
          nextScreen={"SelectSkates"}
        ></ProfileConfigHeader>
      }
      body={getBody()}
    ></Layout2Piece>
  );
};

export default Intro;
