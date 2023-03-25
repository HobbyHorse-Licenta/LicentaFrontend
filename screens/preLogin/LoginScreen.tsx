import React, {useContext, useRef, useState} from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { scale, verticalScale } from 'react-native-size-matters';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import NotificationPopup from 'react-native-push-notification-popup';

import { SpacingStyles } from '../../styles';
import { Layout1Piece } from '../layouts';
import { Authentication } from '../../services';
import { useDispatch, useSelector } from 'react-redux';
import {setLoginState} from '../../redux/appState'
import { NotifRefProvider } from '../../WholeScreen';

const LoginScreen = () => {

    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const notificationRef = useContext(NotifRefProvider);
    const popUp = useRef<NotificationPopup | null>(null);
    const theme = useTheme();
    const dispatch = useDispatch();

    const handleEmailInput = (typedText: string) => {setEmail(typedText)};
    const handlePasswordInput = (typedText: string) => {setPassword(typedText)};

    const showErrorPopUp = () => {
        if(notificationRef != null)
            notificationRef.current?.show({
                onPress: function() {console.log('[LoginScreen]: Popup Pressed')},
                appTitle: 'Notification',
                timeText: 'Now',
                title: 'Error',
                body: '[LoginScreen]: credentials are incorrect.\nTry again 😀',
                slideOutTime: 2000
            });
    }
    const handleLogin = async () => {
        const res = Authentication.loginCredentialsValid(email, password);
        if(res)
        {
            console.log("[LoginScreen]: go to 'AfterLogin' stack");
            dispatch(setLoginState(true));
        }
        else showErrorPopUp();
    };

    const getBody = () =>  {
        return (
            <KeyboardAvoidingView style={[StyleSheet.absoluteFill, styles.mainContainer, { backgroundColor: theme.colors.background}]} behavior='position'>
                <View style={{alignItems: 'center'}}>
                    <Animatable.Image animation="swing" iterationCount={Infinity} iterationDelay={4000} style={[styles.logoView, {resizeMode:'contain'}]}
                    source={require('../../assets/randomPics/hobby_horse.png')}></Animatable.Image>
                    
                    <Text style={styles.text} variant="displayMedium">Login</Text>
                </View>
                
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
            </KeyboardAvoidingView>
        );
    }
    return (
        <Layout1Piece body={getBody()}/>
    );
};

export default LoginScreen;

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
        padding: scale(10)
    },
    form: {
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