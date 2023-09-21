import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import { Text, TextInput, useTheme } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { scale, verticalScale } from "react-native-size-matters";

import { Button } from "../../components/general";
import { Layout1Piece } from "../layouts";
import { validation } from "../../utils";
import { firebaseAuth } from "../../WholeScreen";
import { uiUtils } from "../../utils";
import { useDispatch } from "react-redux";
import { setJWTTokenResult } from "../../redux/appState";
import PasswordInput from "../../components/general/PasswordInput";

const SignUpScreen = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [confirmationPassword, setConfirmationPassword] = useState<
    string | undefined
  >(undefined);

  const handleEmailInput = (typedText: string) => {
    setEmail(typedText);
  };
  const handlePasswordInput = (typedText: string) => {
    setPassword(typedText);
  };

  const createAccount = async () => {
    if (
      email !== undefined &&
      password !== undefined &&
      confirmationPassword !== undefined
    ) {
      if (validation.validateEmailAndPassword(email, password, true) === true) {
        if (password === confirmationPassword) {
          createUserWithEmailAndPassword(firebaseAuth, email, password)
            .then(userCredential => {
              // Signed in
              userCredential.user.getIdTokenResult().then(jwtTokenResult => {
                dispatch(setJWTTokenResult(jwtTokenResult));
              });
            })
            .catch(error => {
              if (error.code == "auth/email-already-in-use") {
                uiUtils.showPopUp(
                  "Error",
                  "There is already an account with this email"
                );
              } else {
                console.error(error.code);
              }
            });
        } else {
          uiUtils.showPopUp("Error", "Passwords don't match");
        }
      }
    } else {
      uiUtils.showPopUp("Warning", "Please input all fields😀");
    }
  };

  //<KeyboardAvoidingView style={[StyleSheet.absoluteFill, styles.mainContainer, { backgroundColor: theme.colors.background}]} behavior='padding'>
  const getBody = () => {
    return (
      <View>
        <View style={{ width: scale(320), alignSelf: "center" }}>
          <View style={{ justifyContent: "center" }}>
            <Animatable.Image
              animation="swing"
              iterationCount={Infinity}
              iterationDelay={12000}
              style={[
                styles.logoView,
                { resizeMode: "contain", alignSelf: "center" },
              ]}
              source={require("../../assets/randomPics/hobby_horse.png")}
            ></Animatable.Image>
          </View>
          <Text style={[styles.text]} variant="displaySmall">
            Create account
          </Text>
        </View>

        <ScrollView style={styles.form}>
          <TextInput
            style={[
              styles.textInput,
              { backgroundColor: theme.colors.primary },
            ]}
            autoCapitalize={"none"}
            selectionColor={theme.colors.tertiary}
            label="Email"
            value={email}
            onChangeText={handleEmailInput}
          />
          <PasswordInput
            style={{
              ...styles.textInput,
              backgroundColor: theme.colors.primary,
            }}
            label="Password"
            selectionColor={theme.colors.tertiary}
            value={password}
            onChangeText={handlePasswordInput}
          />
          <PasswordInput
            style={{
              ...styles.textInput,
              backgroundColor: theme.colors.primary,
            }}
            label="Confirm Password"
            value={confirmationPassword}
            selectionColor={theme.colors.tertiary}
            onChangeText={(typedText: string) =>
              setConfirmationPassword(typedText)
            }
          />
          <View style={styles.buttonAndText}>
            <Button
              style={styles.button}
              mode="contained"
              onPress={() => {
                createAccount();
              }}
              text={"Create Account"}
            />
          </View>
        </ScrollView>
        {/* </KeyboardAvoidingView> */}
      </View>
    );
  };
  return <Layout1Piece body={getBody()} />;
};

export default SignUpScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: scale(14),
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  logoView: {
    width: verticalScale(100),
    height: verticalScale(100),
    margin: scale(15),
  },
  text: {
    padding: scale(10),
    alignSelf: "center",
  },
  form: {
    alignSelf: "center",
  },
  textInput: {
    width: scale(250),
    height: verticalScale(50),
    margin: verticalScale(20),
  },
  descriptionInput: {
    width: scale(250),
    margin: verticalScale(20),
  },
  buttonAndText: {
    width: scale(250),
    margin: verticalScale(20),
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: scale(250),
    marginVertical: scale(10),
  },
});
