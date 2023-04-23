import React, {useContext, useRef, useState} from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { scale, verticalScale } from 'react-native-size-matters';
import { Text, TextInput, useTheme } from 'react-native-paper';
import NotificationPopup from 'react-native-push-notification-popup';
import {onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";


import { Button } from '../../components/general';
import { SpacingStyles } from '../../styles';
import { Layout1Piece } from '../layouts';
import { Authentication, Fetch } from '../../services';
import { useDispatch, useSelector } from 'react-redux';
import {setIsLoading, setJWTToken, setUser} from '../../redux/appState'
import { NotifRefProvider } from '../../WholeScreen';
import { useNavigation } from '@react-navigation/native';
import { firebaseAuth } from '../../WholeScreen';
import { uiUtils, validation } from '../../utils';

const LoginScreen = () => {

    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const notificationRef = useContext(NotifRefProvider);
    const popUp = useRef<NotificationPopup | null>(null);
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleEmailInput = (typedText: string) => {setEmail(typedText)};
    const handlePasswordInput = (typedText: string) => {setPassword(typedText)};

   
    // onAuthStateChanged(firebaseAuth, (user) => {
    // if (user) {
    //     // User is signed in, see docs for a list of available properties
    //     // https://firebase.google.com/docs/reference/js/firebase.User
    //     const uid = user.uid;
    //     // ...
    //     console.log("[LoginScreen]: user is singed in");
    // } else {
    //     // User is signed out
    //     // ...
    //     console.log("[LoginScreen]: user is singed out");
    // }
    // });

    const handleLogin = async () => {
        if(email !== undefined && password !== undefined)
        {
            if(validation.validateEmailAndPassword(email, password, false) === true)
            {
                signInWithEmailAndPassword(firebaseAuth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    userCredential.user.getIdToken().then((jwtToken) => {
                        dispatch(setJWTToken(jwtToken));
                    })
                    try {
                        dispatch(setIsLoading(true));
                        console.log("set is loading to true");
                        Fetch.getUser(userCredential.user.uid, (user) => {
                            dispatch(setUser(user)); dispatch(setIsLoading(false))}, () =>{console.log("nu am oprit loadingul");   dispatch(setIsLoading(false))});
                    } catch (error) {
                        console.error("No user in database corresponding to this firebase user");
                    }
                    

                    //TODO: add access token and refresh token to appState;
                })
                .catch((error) => {
                    if(error.code = 'auth/user-not-found')
                    {
                        uiUtils.showPopUp("Error","Incorrect credentials");
                    }
                    else console.error(error.code);
                });
            }
        }
        else uiUtils.showPopUp("Warning", "Not all credentials provided");
        
    };

    const getBody = () =>  {
        return (
            <KeyboardAvoidingView style={[StyleSheet.absoluteFill, styles.mainContainer, { backgroundColor: theme.colors.background}]} behavior='padding'>
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
                        autoCapitalize={"none"}
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
                            handleLogin()}} text={'Login'}/>
                            <View style={{alignItems: 'flex-start', width: '100%', marginBottom: scale(4)}}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.actionText} variant='labelSmall'>Don't have an account?</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('SignUp' as never)}>
                                        <Text style={[{fontWeight: 'bold', color: theme.colors.tertiary}]} variant='labelSmall'> Sign Up</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={() => console.log("[LoginScreen]: reset password")}>
                                        <Text style={[styles.actionText, {fontWeight: 'bold', color: theme.colors.tertiary}]} variant='labelSmall'>Forgot password?</Text>
                                </TouchableOpacity>
                            </View>
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
        marginLeft: scale(10)
    }
});