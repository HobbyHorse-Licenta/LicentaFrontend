import React, {useState} from 'react';
import { View } from 'react-native';

import { SafeAreaView } from 'react-navigation';

import { Text, TextInput, Button } from 'react-native-paper';

const LoginScreen = () => {

    const [email, setEmail] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);

    const handleEmailInput = (typedText: string) => {setEmail(typedText)};
    const handlePasswordInput = (typedText: string) => {setPassword(typedText)};

    
    const handleLogin = async () => {
        // try{
        //     await loginAccountWrapper(email,password);
        // }
        // catch (err) {
        //     console.log(err.message)
        // }
    };

    return (
        <SafeAreaView>
                <View>
                    <Text style={{color: "white"}} variant="displayMedium">Login</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View>
                            <TextInput
                            label="Email"
                            value={email}
                            onChangeText={handleEmailInput}
                            />
                            <TextInput
                            label="Password"
                            value={password}
                            secureTextEntry={true}
                            onChangeText={handlePasswordInput}
                            />
                            <Button mode="contained"
                                onPress={() => {
                                handleLogin()}}>
                                Login
                            </Button>
                        </View>
                    </View>
                </View>
        </SafeAreaView>
    );
};

export default LoginScreen;

