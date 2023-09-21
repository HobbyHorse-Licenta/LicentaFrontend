import React, { useState } from "react";
import { StyleSheet, Keyboard } from "react-native";

import { Text, TextInput, useTheme } from "react-native-paper";
import { scale, verticalScale } from "react-native-size-matters";
import { validation } from "../../utils";

import { PrimaryContainer } from "../general";

interface Input {
  onNameChange: Function;
  onDescriptionChange: Function;
}
const SelectNameAndDescription = ({
  onNameChange,
  onDescriptionChange,
}: Input) => {
  const theme = useTheme();

  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();

  const updateName = (typedName: string) => {
    if (validation.validateName(typedName) || typedName === "") {
      setName(typedName);
      onNameChange(typedName);
    } else {
      setName(previousText => previousText);
    }
  };

  const lastCharIsEnter = (text: string) => {
    if (text.length === 0) {
      return false;
    }

    const enterKeyCode = 10;
    if (text.slice(-1).charCodeAt(0) === enterKeyCode) {
      return true;
    } else {
      return false;
    }
  };
  const updateDescription = (typedDescription: string) => {
    if (lastCharIsEnter(typedDescription)) {
      setDescription(previousText => previousText);
      Keyboard.dismiss();
    }

    if (
      validation.validateShortDescription(typedDescription) ||
      typedDescription === ""
    ) {
      setDescription(typedDescription);
      onDescriptionChange(typedDescription);
    } else {
      setDescription(previousText => previousText);
    }
  };

  return (
    <PrimaryContainer
      styleInput={{
        backgroundColor: theme.colors.background,
        padding: scale(5),
        margin: scale(20),
      }}
    >
      <Text style={{ margin: scale(5) }}>How should we call you?</Text>
      <TextInput
        style={[styles.nameInput, { backgroundColor: theme.colors.primary }]}
        label="Write your name"
        selectionColor={theme.colors.tertiary}
        value={name}
        onChangeText={updateName}
      />
      <Text style={{ margin: scale(5) }}>Tell us a bit about yourself</Text>
      <TextInput
        style={[
          styles.descriptionInput,
          { backgroundColor: theme.colors.primary },
        ]}
        multiline={true}
        selectionColor={theme.colors.tertiary}
        label="Give a short description of yourself"
        value={description}
        numberOfLines={7}
        onChangeText={updateDescription}
      />
    </PrimaryContainer>
  );
};

export default SelectNameAndDescription;

const styles = StyleSheet.create({
  descriptionInput: {
    width: scale(250),
    maxHeight: verticalScale(100),
    margin: verticalScale(20),
  },
  nameInput: {
    width: scale(250),
    margin: verticalScale(20),
  },
});
