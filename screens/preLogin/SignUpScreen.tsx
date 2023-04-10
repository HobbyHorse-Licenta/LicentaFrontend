import React, {useState} from 'react';
import { KeyboardAvoidingView, View, StyleSheet, ScrollView} from 'react-native';
import * as Animatable from 'react-native-animatable';

import { SafeAreaView } from 'react-navigation';

import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { Layout1Piece } from '../layouts';
import { scale, verticalScale } from 'react-native-size-matters';


const SignUpScreen = () => {

    const theme = useTheme();

    const [email, setEmail] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [description, setDescription] = useState<string>();
    const [descriptionHeight, setDescriptionHeight] = useState(scale(20));

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

    const createAccount = async () => {
        // try{
        //     await loginAccountWrapper(email,password);
        // }
        // catch (err) {
        //     console.log(err.message)
        // }
    };

 
    const getBody = () =>  {
        return (
            <KeyboardAvoidingView style={[StyleSheet.absoluteFill, styles.mainContainer, { backgroundColor: theme.colors.background}]} behavior='padding'>
                <View style={{width: scale(320), alignSelf: 'center'}}>
                    <View style={{justifyContent: "center"}}>
                        <Animatable.Image animation="swing" iterationCount={Infinity} iterationDelay={12000} style={[styles.logoView, {resizeMode:'contain', alignSelf: 'center'}]}
                        source={require('../../assets/randomPics/hobby_horse.png')}></Animatable.Image> 
                    </View>
                    <Text style={[styles.text]} variant="displaySmall">Create account</Text>
                </View>
              
                <ScrollView style={styles.form}>
                        <TextInput
                        style={[styles.textInput, {backgroundColor: theme.colors.primary}]}
                        label="Email"
                        value={email}
                        onChangeText={handleEmailInput}
                        />
                        <TextInput
                        style={[styles.textInput, {backgroundColor: theme.colors.primary}]}
                        label="Password"
                        value={password}
                        secureTextEntry={true}
                        onChangeText={handlePasswordInput}
                        />
                        <TextInput
                        style={[styles.textInput, {backgroundColor: theme.colors.primary}]}
                        label="Confirm Password"
                        value={password}
                        secureTextEntry={true}
                        onChangeText={handlePasswordInput}
                        />
                        <TextInput
                        style={[styles.descriptionInput, {height: descriptionHeight, backgroundColor: theme.colors.primary}]}
                        multiline={true}
                        label="Give a short description of yourself"
                        value={description}
                        onContentSizeChange={(event) => {
                            setDescriptionHeight(event.nativeEvent.contentSize.height);
                          }}
                        onChangeText={setDescription}
                        />
                        <View style={styles.buttonAndText}>
                            <Button style={styles.button} 
                                mode="contained"
                                onPress={() => {
                                    createAccount()}}>
                                Create Account
                            </Button>
                        </View>
                        
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
    return (
        <Layout1Piece body={getBody()}/>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: scale(14),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    logoView: {
        width: verticalScale(100),
        height: verticalScale(100),
        margin: scale(15),
    },
    text: {
        padding: scale(10),
        alignSelf: 'center'
    },
    form: {
        alignSelf: 'center'
    },
    textInput: {
        width: scale(250),
        height: verticalScale(50),
        margin: verticalScale(20),
    },
    descriptionInput: {
        width: scale(250),
        margin: verticalScale(20),
    },
    buttonAndText: {
        width: scale(250),
        margin: verticalScale(20),
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: scale(250),
        marginVertical: scale(10)
    },
    actionText: {
        marginLeft: scale(10)
    }
});