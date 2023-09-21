import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  AggresiveEventDisplay,
  EventDisplay,
  MyEvents,
} from "../../screens/postLogin/events";

const MyEventsStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyEvents" component={MyEvents} />
      <Stack.Screen name="EventDisplay" component={EventDisplay} />
      <Stack.Screen
        name="AggresiveEventDisplay"
        component={AggresiveEventDisplay}
      />
    </Stack.Navigator>
  );
};

export default MyEventsStack;
