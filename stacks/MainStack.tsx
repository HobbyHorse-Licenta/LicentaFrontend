import React from 'react';

import { SafeAreaView } from 'react-navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BeforeLogin from './BeforeLogin';

const MainStack = () => {

  const Stack = createNativeStackNavigator();

  // const linking = {
  //   prefixes: [Linking.createURL('/'), 'http://localhost:19007'],
  // };

  return ( 
      <SafeAreaView>
        <Stack.Navigator>
          <Stack.Screen name="BeforeLogin" component={BeforeLogin}/>
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
        }
        </Stack.Navigator>
      </SafeAreaView>
  );
}

export default MainStack;