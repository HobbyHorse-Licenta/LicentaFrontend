import React from "react";
import { StyleSheet, View } from "react-native";

import { scale } from "react-native-size-matters";
import { Text } from "react-native-paper";

import { SpacingStyles } from "../../styles";
import { User } from "../../types";
import PrimaryContainer from "./PrimaryContainer";
import RoundPicture from "./RoundPicture";

interface Input {
  user: User;
}
const UserSummary = ({ user }: Input) => {
  return (
    <PrimaryContainer styleInput={{ flexDirection: "row" }}>
      <PrimaryContainer styleInput={SpacingStyles.profilePicContainer}>
        <RoundPicture image={user.profileImageUrl}></RoundPicture>
      </PrimaryContainer>
      <View style={styles.infoContainer}>
        <Text variant="titleLarge">{user.name}</Text>
        <Text variant="titleMedium">Age: {user.age}</Text>
        <Text variant="titleMedium">Gender: {user.gender}</Text>
      </View>
    </PrimaryContainer>
  );
};

export default UserSummary;

const styles = StyleSheet.create({
  infoContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: scale(200),
    height: scale(100),
  },
});
