import React, {useState} from 'react';
import { View, StyleSheet, TouchableOpacity} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { scale, verticalScale } from 'react-native-size-matters';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';

import { SpacingStyles } from '../../styles';
import { Layout1Piece } from '../layouts';
import { Authentication } from '../../services';

const LoginScreen = () => {

    const [email, setEmail] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);

    const theme = useTheme();

    const handleEmailInput = (typedText: string) => {setEmail(typedText)};
    const handlePasswordInput = (typedText: string) => {setPassword(typedText)};
    const handleLogin = async () => {
        const res = Authentication.loginCredentialsValid();
        if(res)
        {
            console.log("[LoginScreen]: procced to AFTERLOGIN stack");
        }
        else{
            console.log("[LoginScreen]: credentials are incorrect");
        }
    };

    const getBody = () =>  {
        return (
            <View style={[SpacingStyles.centeredContainer, SpacingStyles.fullSizeContainer, {flex: 1, padding: scale(14), backgroundColor: theme.colors.background}]}>
               
                    <Animatable.Image animation="swing" iterationCount={Infinity} iterationDelay={4000} style={[styles.logoView, {resizeMode:'contain'}]}
                    source={require('../../assets/randomPics/hobby_horse.png')}></Animatable.Image>
                
                
                <Text style={styles.text} variant="displayMedium">Login</Text>
                <View style={ styles.form}>
                    <View>
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
                        <View style={styles.buttonAndText}>
                            <Button style={styles.button} 
                                mode="contained"
                                onPress={() => {
                                handleLogin()}}>
                                Login
                            </Button>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.actionText} variant='labelSmall'>Don't have an account?</Text>
                                <TouchableOpacity onPress={() => console.log("[LoginScreen]: create new account")}>
                                    <Text style={[styles.actionText, {fontWeight: 'bold'}]} variant='labelSmall'>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => console.log("[LoginScreen]: reset password")}>
                                    <Text style={[styles.actionText, {fontWeight: 'bold'}]} variant='labelSmall'>Forgot password?</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                </View>
            </View>
        );
    }
    return (
        <Layout1Piece body={getBody()}/>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    logoView: {
        //flex: 5,
        width: verticalScale(100),
        height: verticalScale(100),
        margin: scale(15)
    },
    text: {
        //flex: 3,
        padding: scale(10)
    },
    form: {
        //flex: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        width: scale(250),
        height: verticalScale(50),
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
        marginHorizontal: scale(10)
    }
});