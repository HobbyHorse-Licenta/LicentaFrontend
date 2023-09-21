import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { EditProfile, MyProfile } from "../../screens/postLogin/profiles";

const MyProfileStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};

export default MyProfileStack;
