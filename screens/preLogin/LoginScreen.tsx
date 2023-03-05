import React, {useRef, useState} from 'react';
import { View, StyleSheet, TouchableOpacity} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { scale, verticalScale } from 'react-native-size-matters';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import NotificationPopup from 'react-native-push-notification-popup';

import { SpacingStyles } from '../../styles';
import { Layout1Piece } from '../layouts';
import { Authentication } from '../../services';

const LoginScreen = () => {

    const [email, setEmail] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);
    
    const popUp = useRef<NotificationPopup | null>(null);
    const theme = useTheme();

    const handleEmailInput = (typedText: string) => {setEmail(typedText)};
    const handlePasswordInput = (typedText: string) => {setPassword(typedText)};

    const showErrorPopUp = () => {
        popUp.current?.show({
            onPress: function() {console.log('[LoginScreen]: Popup Pressed')},
            appTitle: 'Notification',
            timeText: 'Now',
            title: 'Error',
            body: '[LoginScreen]: credentials are incorrect.\nTry again 😀',
            slideOutTime: 5000
        });
    }
    const handleLogin = async () => {
        const res = Authentication.loginCredentialsValid();
        if(res)
        {
            console.log("[LoginScreen]: procced to AFTERLOGIN stack");
        }
        else showErrorPopUp();
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
                
               <View style={SpacingStyles.popUpContainer}>
                    <NotificationPopup
                    ref={popUp}
                    shouldChildHandleResponderStart={true}
                    shouldChildHandleResponderMove={true} />
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
        width: verticalScale(100),
        height: verticalScale(100),
        margin: scale(15)
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