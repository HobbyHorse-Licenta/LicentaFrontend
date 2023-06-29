import React, {useState} from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { scale, verticalScale } from 'react-native-size-matters';
import { Text, TextInput, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


import Button from '../../components/general/Button';
import { Layout1Piece } from '../layouts';
import { authenticationUtils, uiUtils, validation } from '../../utils';
import LoadingScreen from './LoadingScreen';
import PasswordInput from '../../components/general/PasswordInput';

const LoginScreen = () => {

    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [loading, setLoading] = useState(false);
    const theme = useTheme();
    const navigation = useNavigation();

    const handleEmailInput = (typedText: string) => {setEmail(typedText)};
    const handlePasswordInput = (typedText: string) => {setPassword(typedText)};

    const handleLogin = async () => {
        if(email !== undefined && password !== undefined)
        {
            if(validation.validateEmailAndPassword(email, password, false) === true)
            {
                setLoading(true);
                authenticationUtils.login(email, password, () =>  setLoading(false));
            }
        }
        else uiUtils.showPopUp("Warning", "Not all credentials provided");
        
    };

    const getBody = () =>  {
        if(loading === true)
        return(<LoadingScreen></LoadingScreen>)
       
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
                        selectionColor={theme.colors.tertiary}
                        autoCapitalize={"none"}
                        onChangeText={handleEmailInput}
                        />
                        <PasswordInput
                        style={{...styles.textInput, backgroundColor: theme.colors.primary}}
                        label="Password"
                        selectionColor={theme.colors.tertiary}
                        value={password}
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
                                {/* <TouchableOpacity onPress={() => console.log("[LoginScreen]: reset password")}>
                                        <Text style={[styles.actionText, {fontWeight: 'bold', color: theme.colors.tertiary}]} variant='labelSmall'>Forgot password?</Text>
                                </TouchableOpacity> */}
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