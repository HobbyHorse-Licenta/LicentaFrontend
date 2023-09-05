import React, {useState, useEffect} from "react";
import {View, StyleSheet} from 'react-native'

import { Appbar, Text, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { scale } from "react-native-size-matters";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import 'firebase/auth';
import uuid from 'react-native-uuid';
import { useDispatch, useSelector } from "react-redux";

import { AppHeader, Button, GeneralModal, LoadingComponent } from "../general";
import { setAddingSkateProfile, setUser } from "../../redux/appState";
import { SkateProfile, User } from "../../types";
import { Fetch } from "../../services";
import { authenticationUtils, validation } from "../../utils";
import { RootState } from "../../redux/store";
import { resetConfigProfileState } from "../../redux/configProfileState";
import { setCurrentSkateProfile } from "../../redux/globalState";

interface ConfigHeaderInput {
    backButton?: boolean,
    nextScreen?: string,
    doneConfig?: boolean
    disabled?: boolean
}
const ProfileConfigHeader = ({backButton, nextScreen, disabled, doneConfig} : ConfigHeaderInput) => {

    const {skateType, skatePracticeStyle, skateExperience, age, gender, name, shortDescription } = useSelector((state: any) => state.configProfile)
    const { userId, addingSkateProfile, user, JWTTokenResult } = useSelector((state: RootState) => state.appState)

    const [postedUser, setPostedUser] = useState<User | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const theme = useTheme();
    const [infoModalVisible, setInfoModalVisible] = useState(false);
    const [closing, setClosing] = useState(false);
    const displayModalForSeconds = 13;
    let timeoutId;

   
    useEffect(() => {
        if(infoModalVisible === true)
        {
            postUserAndSkateProfile();
            timeoutId = setTimeout(() => setClosing(true), displayModalForSeconds * 1000);
        }
    }, [infoModalVisible]);


    useEffect(() => {
        if(closing === true)
        {
            if(postedUser !== undefined)
            {
                setLoading(false);
                clearTimeout(timeoutId);
                setInfoModalVisible(false);

                //this also advances navigation to EventsScreen
                dispatch(setUser(postedUser)); 
            }
            else{
                setLoading(true);
            }
        }
    }, [closing, postedUser]);

    const postUserAndSkateProfile = () => {
        const user: User | null = createUserWithSkateProfile();
        if(user !== null) //user created succesfully
        {
            console.log("Posting user");
            if(JWTTokenResult !== undefined && !validation.isJWTTokenExpired(JWTTokenResult))
            {
                Fetch.postUser(JWTTokenResult.token,
                    user, (postedUser: User) => {setPostedUser(postedUser); dispatch(setCurrentSkateProfile(postedUser?.skateProfiles[0])); }, () => console.log("Coudn't post user at profile creation"));
            }
            else{
                //TODO refresh token
            }
        }
        else {
            authenticationUtils.logOut();
        }
    }
    const goNext = () => {
        if(nextScreen != undefined)
            navigation.navigate(nextScreen as never);
    }
    const goBack = () => {
        if(backButton !== undefined && backButton == true)
        {
            if(navigation.canGoBack())
                navigation.goBack();
            if(addingSkateProfile == true)
            {
                dispatch(resetConfigProfileState());
                dispatch(setAddingSkateProfile(false));
            }
        }
    }

    const createUserWithSkateProfile = () : User | null => {
        if(userId !== undefined)
        {
            const skateProfileId = uuid.v4().toString();

            const skateProfile:  SkateProfile = {
                id: skateProfileId,
                userId: userId,
                skateType: skateType,
                skatePracticeStyle: skatePracticeStyle,
                skateExperience: skateExperience,
            }
            
            const skateProfiles: Array<SkateProfile> = [];
            skateProfiles.push(skateProfile);

            const user: User = {
                id: userId,
                age: age,
                gender: gender,
                name: name,
                shortDescription: shortDescription,
                skateProfiles: skateProfiles
            }

            return user
        }
        else return null;
       
    }

    const createSkateProfile = () : SkateProfile | null =>
    {
        if(user !== undefined)
        {
            
            console.log("Skate TYPE: " + skateType);
            const profile: SkateProfile = {
                id: uuid.v4().toString(),
                userId: user.id,
                skateType: skateType,
                skateExperience: skateExperience,
                skatePracticeStyle: skatePracticeStyle 
            }
            return profile;
        }
        return null;
        
    }
    const endProfileConfiguration = () => {
        if(addingSkateProfile === true)
        {
            if(user !== undefined)
            {
                const res = createSkateProfile();
                if(res !== null)
                {
                    if(JWTTokenResult !== undefined && !validation.isJWTTokenExpired(JWTTokenResult))
                    {
                        Fetch.postSkateProfile(JWTTokenResult.token, res,
                        (postedSkateProfile) => {
                            dispatch(setUser({...user, skateProfiles: [...user.skateProfiles, postedSkateProfile]}))
                        },
                        () => console.log("Coudn't post skateProfile"))
                    }
                    else{
                        //TODO refresh token
                    }
                   
                }
            }
            dispatch(resetConfigProfileState());
            dispatch(setAddingSkateProfile(false));
        }
        else setInfoModalVisible(true);
    }


    const getModalInfo = () => {
        return(
            <View style={{justifyContent: "center", alignItems: "center"}}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.textCategory}>Skates selected: </Text>
                    <Text style={[styles.textCategory,{color: theme.colors.tertiary}]}>{skateType}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.textCategory}>Want to practice: </Text>
                    <Text style={[styles.textCategory,{color: theme.colors.tertiary}]}>{skatePracticeStyle}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.textCategory}>Your experince level: </Text>
                    <Text style={[styles.textCategory,{color: theme.colors.tertiary}]}>{skateExperience}</Text>
                </View>
                {(gender != undefined) && 
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.textCategory}>Gender: </Text>
                    <Text style={[styles.textCategory,{color: theme.colors.tertiary}]}>{gender}</Text>
                </View>}
                {(age != undefined) &&
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.textCategory}>Age: </Text>
                    <Text style={[styles.textCategory,{color: theme.colors.tertiary}]}>{age}</Text>
                </View>}
            </View>
           
        );
    }

    const getCountDownCircle = () => {
        return(
            <View style={styles.timer}>
                <CountdownCircleTimer
                    strokeWidth={4}
                    isPlaying
                    duration={displayModalForSeconds}
                    colors={['#000000', '#000000']}
                    colorsTime={[displayModalForSeconds, 1]}
                    size={scale(60)}
                >
                    {({ remainingTime }) => <Text>{remainingTime}</Text>}
                </CountdownCircleTimer>
            </View>
        )
    }
    return(
        <AppHeader>
            {(backButton !== undefined && backButton === true) && <Appbar.BackAction style={{left: scale(20), position: 'absolute'}} onPress={goBack}/>}
            {(backButton === false) && <Button disabled={false} text="LOGOUT" onPress={authenticationUtils.logOut} style={{position: 'absolute', left: scale(20)}}/>}
            {(nextScreen !== undefined) && <Button disabled={disabled} text="NEXT" onPress={goNext} style={{position: 'absolute', right: scale(20)}}/>}
            {(doneConfig === true) && <Button disabled={disabled} text="DONE" onPress={endProfileConfiguration} style={{position: 'absolute', right: scale(20)}}/>}
            <GeneralModal visible={infoModalVisible} onDismiss={() => setClosing(true)}>
                {
                    loading === false ?
                    (
                        <View style={{justifyContent: "center", alignItems:"center"}}>
                            {getCountDownCircle()}
                            {getModalInfo()}
                        </View>
                    ):
                    (
                        <View style={{width: "100%", height: "100%"}}>
                            <LoadingComponent width={300} height={300}></LoadingComponent>
                        </View>
                    )
                }
            </GeneralModal>
        </AppHeader>
    );
}

export default ProfileConfigHeader;

const styles = StyleSheet.create({
    timer: {
       margin: scale(20)
    },
    textCategory: {
        marginLeft: scale(5),
        marginTop: scale(5),
        marginBottom: scale(5),
    },
    textValue: {
        marginRight: scale(5),
        marginTop: scale(5),
        marginBottom: scale(5),
        fontWeight: 'bold'
    }
});