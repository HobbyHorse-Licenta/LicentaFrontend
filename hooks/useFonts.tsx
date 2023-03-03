import * as Font from "expo-font";
 
export default async function useFonts(){
    await Font.loadAsync({
        'AlexBrush': require('../assets/fonts/AlexBrush-Regular.ttf'),
    });
}
  