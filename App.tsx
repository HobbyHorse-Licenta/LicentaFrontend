import React from 'react'
import {Provider as PaperProvider} from 'react-native-paper'
import WholeScreen from './WholeScreen';
import store from './redux/store'
import { Provider as ReduxProvider, useSelector } from 'react-redux';
import { COLORS } from './assets/colors/colors';

const theme = {
  "colors": {
    "primary": COLORS.sandyBrown,
    "onPrimary": "white",
    "primaryContainer": COLORS.sandyBrown,
    "onPrimaryContainer": COLORS.frenchGray,

    "secondary": COLORS.battleshipGray,
    "onSecondary": "white",
    "secondaryContainer": COLORS.battleshipGray,
    "onSecondaryContainer": COLORS.ghostWhite,

    "tertiary": "rgb(70, 102, 75)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(200, 236, 201)",
    "onTertiaryContainer": "rgb(3, 33, 12)",

    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    
    "background": "white",
    "onBackground": COLORS.violet,

    "surface": COLORS.violet,
    "onSurface": "white",

    "surfaceVariant": "rgb(235, 225, 207)",
    "onSurfaceVariant": "rgb(76, 70, 57)",
    "outline": "rgb(125, 118, 103)",
    "outlineVariant": "rgb(207, 198, 180)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(51, 48, 42)",
    "inverseOnSurface": "rgb(247, 240, 231)",
    "inversePrimary": "rgb(240, 193, 0)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(248, 243, 242)",
      "level2": "rgb(244, 238, 235)",
      "level3": "rgb(240, 234, 227)",
      "level4": "rgb(238, 232, 224)",
      "level5": "rgb(235, 229, 219)"
    },
    "surfaceDisabled": "rgba(30, 27, 22, 0.12)",
    "onSurfaceDisabled": "rgba(30, 27, 22, 0.38)",
    "backdrop": "rgba(53, 48, 36, 0.4)"
  }
  
};


export default function App() {

 
  return (
    <ReduxProvider store={store}>
        <PaperProvider theme={theme}>
          <WholeScreen></WholeScreen>
        </PaperProvider>
    </ReduxProvider>
  );
}


