import React, {useState, useEffect} from "react";
import {View, StyleSheet} from 'react-native'

import { Appbar, Text, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { scale } from "react-native-size-matters";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import 'firebase/auth';
import uuid from 'react-native-uuid';
import { signOut } from "firebase/auth";

import { AppHeader, Button, GeneralModal } from "../general";
import { useDispatch, useSelector } from "react-redux";
import { resetAppState, setAddingSkateProfile, setInitialProfileConfigured, setUser } from "../../redux/appState";
import { firebaseAuth } from "../../WholeScreen";
import { AssignedSkill, SkateProfile, User } from "../../types";
import { Fetch } from "../../services";
import { authenticationUtils } from "../../utils";
import { RootState } from "../../redux/store";
import { resetConfigProfileState } from "../../redux/configProfileState";

interface ConfigHeaderInput {
    backButton?: boolean,
    nextScreen?: string,
    doneConfig?: boolean
    disabled?: boolean
}
const ProfileConfigHeader = ({backButton, nextScreen, disabled, doneConfig} : ConfigHeaderInput) => {

    const {sport, skateType, skatePracticeStyle, skateExperience, age, gender, name, shortDescription } = useSelector((state: any) => state.configProfile)
    const { userId, addingSkateProfile, user } = useSelector((state: RootState) => state.appState)

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const theme = useTheme();
    const [infoModalVisible, setInfoModalVisible] = useState(false);
    const displayModalForSeconds = 13;
    let timeoutId;
    useEffect(() => {
        if(infoModalVisible === true)
        {
            timeoutId = setTimeout(() => closeModalAndAdvance(), displayModalForSeconds * 1000);
        }
      }, [infoModalVisible]);

    const goNext = () => {
        if(nextScreen != undefined)
            navigation.navigate(nextScreen as never);
    }
    const goBack = () => {
        if(backButton != undefined)
        {
            if(navigation.canGoBack())
                navigation.goBack();
        }
    }

    const createUserWithSkateProfile = () : User | null => {
        if(userId !== undefined)
        {
            const skateProfileId = uuid.v4().toString();

            // const assignedSkillsArray: Array<AssignedSkill> = [];
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
    const closeModalAndAdvance = () => {
        clearTimeout(timeoutId);
        setInfoModalVisible(false);
        const user: User | null = createUserWithSkateProfile();
        if(user !== null) //user created succesfully
        {
            console.log("///////////////////////\nPOSTING USER:\n" + JSON.stringify(user) + "\n/////////////////////////");
            Fetch.postUser(user, (postedUser: User) => dispatch(setUser(postedUser)));
        }
        else {
            //TODO maybe remove also the created account in firebase
            authenticationUtils.logOut();
        }
       
    }
    const createSkateProfile = () : SkateProfile | null =>
    {
        if(user !== undefined)
        {
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
            //
            if(user !== undefined)
            {
                const res = createSkateProfile();
                if(res !== null)
                {
                    const newUser : User = {...user, skateProfiles: [...user.skateProfiles, res]}
                    
                    Fetch.putUser(user.id, newUser,
                        (putUser) => {console.log("PUT made with success, got user: " + JSON.stringify(putUser)); dispatch(setUser(putUser))},
                       () => console.log("PUT user failed") );
                }
               
            }
            dispatch(resetConfigProfileState());
            dispatch(setAddingSkateProfile(false));
        }
        else setInfoModalVisible(true);
    }


    const getModalInfo = () => {
        return(
            <View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.textCategory}>Sport selected: </Text>
                    <Text style={[styles.textCategory,{color: theme.colors.tertiary}]}>{sport}</Text>
                </View>
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
    return(
        <AppHeader>
            {(backButton !== undefined && backButton === true) && <Appbar.BackAction style={{left: scale(20), position: 'absolute'}} onPress={goBack}/>}
            {(backButton === false) && <Button disabled={false} text="LOGOUT" onPress={authenticationUtils.logOut} style={{position: 'absolute', left: scale(20)}}/>}
            {(nextScreen !== undefined) && <Button disabled={disabled} text="NEXT" onPress={goNext} style={{position: 'absolute', right: scale(20)}}/>}
            {(doneConfig === true) && <Button disabled={disabled} text="DONE" onPress={endProfileConfiguration} style={{position: 'absolute', right: scale(20)}}/>}
            <GeneralModal visible={infoModalVisible} onDismiss={closeModalAndAdvance}>
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
                
                {getModalInfo()}
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