import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MySchedules, Schedule } from "../../screens/postLogin/schedules";

const MySchedulesStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MySchedules" component={MySchedules} />
      <Stack.Screen name="Schedule" component={Schedule} />
    </Stack.Navigator>
  );
};

export default MySchedulesStack;
