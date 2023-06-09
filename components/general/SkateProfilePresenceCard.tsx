import React, {useState, useEffect} from "react";
import { View, Text, ViewStyle } from "react-native";

import { scale } from 'react-native-size-matters';


import { Fetch } from "../../services";
import { SkateProfile, User } from "../../types";
import PrimaryContainer from "./PrimaryContainer";
import RoundPicture from "./RoundPicture";

interface Input {
    skateProfile: SkateProfile,
    inactive?: boolean
}

const SkateProfilePresenceCard = ({skateProfile, inactive} : Input) =>{

    const [user, setUser] = useState<User>();

    console.log("SKATEPROFILE: " + JSON.stringify(skateProfile));

    useEffect(() => {
        Fetch.getAllUsers(
            (users) => findUserWithinUsers(users),
            () => console.log("[SkateProfilePresenceCard]: coudn't get all Users")
        );
    }, [])

    useEffect(() => {
        console.log("\n\n\nPROFILE IMAGE GOT FROM USER: "+ JSON.stringify(user))
    }, [user])


    const getViewStyle = () => {
        const commonStyle: ViewStyle = {padding: scale(10)}
        if(inactive === true)
        {
            return {...commonStyle,
                    backgroundColor: 'gray',
                    opacity: 0.5
            };
        }
        else return commonStyle;
    }

    const findUserWithinUsers = (users: Array<User>) => {
        users.forEach(user => {
            if(user.skateProfiles !== undefined && user.skateProfiles !== null && user.skateProfiles.length !== 0)
            {
                user.skateProfiles.forEach(skateProf => {
                    if(skateProf.id === skateProfile.id)
                    {
                        setUser(user);
                    }
                });
            }
        });
    }
    return(
        <PrimaryContainer>
            {/* <RoundPicture image={user.profileImageUrl}></RoundPicture> */}
            {/* {
                user !== undefined && user !== null &&
                <View style={getViewStyle()}>
          

                    <RoundPicture image={user.profileImageUrl !== undefined && user.profileImageUrl.length !== 0 ? user.profileImageUrl : undefined}></RoundPicture>
                    <Text>{skateProfile.skateExperience}</Text>
                </View>
            } */}
            
        </PrimaryContainer>
    );
}

export default SkateProfilePresenceCard;