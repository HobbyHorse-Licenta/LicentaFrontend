import {Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import BeforeLogin from './BeforeLogin';
import AfterLogin from './AfterLogin';




const MainStack = () => {

  const Stack = createNativeStackNavigator();

  // const linking = {
  //   prefixes: [Linking.createURL('/'), 'http://localhost:19007'],
  // };


  
  return ( 
    <NavigationContainer>
      <SafeAreaView>
        <Stack.Navigator>
        {
          // (false) ? (
          //   <>
          //     <Stack.Screen name="AfterLogin" component={AfterLogin}/>
          //   </>
          //   ) : (
          //     <>
          //     <Stack.Screen name="BeforeLogin" component={BeforeLogin}/>
          //     </>
          //   )
          <>
              <Stack.Screen name="BeforeLogin" component={BeforeLogin}/>
              </>
        }
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default MainStack;