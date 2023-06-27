import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";

import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import { Fetch } from "../../services";
import { SkateProfile, User } from "../../types";
import { validation } from "../../utils";
import SkateProfilePresenceCard from "./SkateProfilePresenceCard";

interface Input {
    suggestedSkateProfiles: Array<SkateProfile>
    attendingSkateProfiles: Array<SkateProfile>
}

const SkateProfilesList = ({suggestedSkateProfiles, attendingSkateProfiles} : Input) =>{

    const [allUsers, setAllUsers] = useState<Array<User>>([]);
    const {JWTTokenResult} = useSelector((state: RootState) => state.appState);

    useEffect(() => {
        if(JWTTokenResult !== undefined && !validation.isJWTTokenExpired(JWTTokenResult))
        {
            Fetch.getAllUsers(
                JWTTokenResult.token,
                (users) => setAllUsers(users),
                () => console.log("[SkateProfilesList]: coudn't get all Users")
            );
        }
        else{
            //TODO refresh token
        }
    }, [])

    return(
        <ScrollView horizontal={true}>
            { attendingSkateProfiles !== undefined && attendingSkateProfiles !== null && attendingSkateProfiles.length !== 0 &&
                attendingSkateProfiles.map((skateProfile, index) => {
                    return(
                        <SkateProfilePresenceCard key={index} allUsers={allUsers} skateProfile={skateProfile}></SkateProfilePresenceCard>
                    )
                })
            }
            { suggestedSkateProfiles !== undefined && suggestedSkateProfiles !== null && suggestedSkateProfiles.length !== 0 &&
                suggestedSkateProfiles.map((skateProfile, index) => {
                    return(
                        <SkateProfilePresenceCard key={index} cardOpacity={0.4} allUsers={allUsers} skateProfile={skateProfile}></SkateProfilePresenceCard>
                    )
                })
            }
        </ScrollView>
    );
}

export default SkateProfilesList;