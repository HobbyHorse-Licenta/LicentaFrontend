import React, { useEffect } from "react";

import { PersistGate } from "redux-persist/integration/react";
import { Provider as ReduxProvider } from "react-redux";
import EStyleSheet from "react-native-extended-stylesheet";
import { Provider as PaperProvider } from "react-native-paper";
import { EventProvider } from "react-native-outside-press";
import { TourGuideProvider } from "rn-tourguide";

import { persistor } from "./redux/store";
import { store } from "./redux/store";
import WholeScreen from "./WholeScreen";
import { COLORS } from "./assets/colors/colors";

const theme = {
  colors: {
    primary: COLORS.aComponentPrimary,
    onPrimary: COLORS.aTextPrimary,

    primaryContainer: COLORS.yellow,
    onPrimaryContainer: COLORS.aPrimaryColorOverall, //rings on

    secondary: COLORS.aComponenySecondary,
    onSecondary: COLORS.aTextPrimary,

    secondaryContainer: COLORS.yellow,
    onSecondaryContainer: COLORS.aPrimaryColorOverall, //small things

    tertiary: COLORS.aPrimaryColorOverall,
    onTertiary: "white",

    tertiaryContainer: COLORS.yellow,
    onTertiaryContainer: COLORS.yellow,

    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",

    background: COLORS.aBackground,
    onBackground: COLORS.aTextSecondary,

    surface: COLORS.aPrimaryColorOverall, //header
    // "surface": COLORS.aComponentPrimary, //header
    onSurface: COLORS.aTextPrimary,

    surfaceVariant: COLORS.aTextPrimary,
    onSurfaceVariant: COLORS.aTextPrimary,
    outline: COLORS.aTextPrimary,

    outlineVariant: "rgb(207, 198, 180)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(51, 48, 42)",
    inverseOnSurface: "rgb(247, 240, 231)",
    inversePrimary: "rgb(240, 193, 0)",
    elevation: {
      level0: "transparent",
      level1: "rgb(248, 243, 242)",
      level2: "rgb(244, 238, 235)",
      level3: "rgb(240, 234, 227)",
      level4: "rgb(238, 232, 224)",
      level5: "rgb(235, 229, 219)",
    },
    surfaceDisabled: COLORS.aDisabledContainer,
    onSurfaceDisabled: COLORS.aDisabledContainerText,

    backdrop: "rgba(53, 48, 36, 0.4)",
  },
};

export const thisIsAwsome = () => {
  return true;
};

export default function App() {
  useEffect(() => {
    EStyleSheet.build();
  }, []);

  return (
    <EventProvider style={{ flex: 1 }}>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider theme={theme}>
            <TourGuideProvider
              {...{ borderRadius: 16 }}
              androidStatusBarVisible={true}
            >
              <WholeScreen></WholeScreen>
            </TourGuideProvider>
          </PaperProvider>
        </PersistGate>
      </ReduxProvider>
    </EventProvider>
  );
}
