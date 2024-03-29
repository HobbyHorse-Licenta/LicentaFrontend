import React, { useEffect } from "react";
import { View } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BeforeLogin from "./BeforeLogin";
import AfterLogin from "./AfterLogin";
import { SpacingStyles } from "../styles";
import { RootState } from "../redux/store";
import { validation } from "../utils";
import { setCurrentRoute } from "../redux/globalState";

const MainStack = () => {
  const { JWTTokenResult } = useSelector((state: RootState) => state.appState);
  const { currentRoute } = useSelector((state: RootState) => state.globalState);
  const Stack = createNativeStackNavigator();
  const navigationRef = createNavigationContainerRef();

  const dispatch = useDispatch();
  useEffect(() => {
    if (
      navigationRef !== undefined &&
      navigationRef.getCurrentRoute()?.name !== currentRoute
    ) {
      //this is in case the currentRoute is saved for a page that has no tabBar but then the app resumes to the main
      //screen of that stack and so the current route should be updated
      dispatch(setCurrentRoute(navigationRef.getCurrentRoute()?.name));
    }
  }, [navigationRef]);

  return (
    <View
      style={[SpacingStyles.fullSizeContainer, { backgroundColor: "orange" }]}
    >
      <NavigationContainer
        ref={navigationRef}
        onStateChange={() => {
          const currentRouteName = navigationRef.getCurrentRoute()?.name;
          if (currentRouteName != undefined) {
            dispatch(setCurrentRoute(currentRouteName));
          }
        }}
      >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {JWTTokenResult !== undefined &&
          !validation.isJWTTokenExpired(JWTTokenResult) ? (
            <>
              <Stack.Screen name="AfterLogin" component={AfterLogin} />
            </>
          ) : (
            <>
              <Stack.Screen name="BeforeLogin" component={BeforeLogin} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default MainStack;
