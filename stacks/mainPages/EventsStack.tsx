import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  Events,
  EventDisplay,
  CreateEvent,
  AggresiveEventDisplay,
} from "../../screens/postLogin/events";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import AddSkillsScreen from "../../screens/postLogin/events/AddSkillsScreen";

const EventsStack = () => {
  const Stack = createNativeStackNavigator();
  const { firstProfileConfig } = useSelector(
    (state: RootState) => state.appState
  );

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {firstProfileConfig === true && (
        <Stack.Screen name="AddSkillsScreen" component={AddSkillsScreen} />
      )}
      <Stack.Screen name="Events" component={Events} />
      <Stack.Screen name="EventDisplay" component={EventDisplay} />
      <Stack.Screen
        name="AggresiveEventDisplay"
        component={AggresiveEventDisplay}
      />
      <Stack.Screen name="CreateEvent" component={CreateEvent} />
    </Stack.Navigator>
  );
};

export default EventsStack;
