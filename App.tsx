import { StyleSheet, Text, View } from 'react-native';
import MainStack from './stacks/MainStack';
import { LoadingScreen } from './screens/preLogin';

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.tsx to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <View style={{flex: 1}}>
     <MainStack></MainStack>
      {/* <LoadingScreen></LoadingScreen> */}
      <Text>{CHaio}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
