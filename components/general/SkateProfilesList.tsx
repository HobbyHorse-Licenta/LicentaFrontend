import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Fetch } from "../../services";
import { SkateProfile, User } from "../../types";
import SkateProfileSummary from "../profile/SkateProfileSummary";
import SkateProfilePresenceCard from "./SkateProfilePresenceCard";
interface Input {
    suggestedSkateProfiles: Array<SkateProfile>
    attendingSkateProfiles: Array<SkateProfile>
}
const SkateProfilesList = ({suggestedSkateProfiles, attendingSkateProfiles} : Input) =>{

    const [allUsers, setAllUsers] = useState<Array<User>>([]);

    useEffect(() => {
        Fetch.getAllUsers(
            (users) => setAllUsers(users),
            () => console.log("[SkateProfilesList]: coudn't get all Users")
        );
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
                        <SkateProfilePresenceCard key={index} allUsers={allUsers} skateProfile={skateProfile}></SkateProfilePresenceCard>
                    )
                })
            }
        </ScrollView>
    );
}

export default SkateProfilesList;