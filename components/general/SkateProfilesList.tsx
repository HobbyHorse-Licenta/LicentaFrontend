import React from "react";
import { ScrollView } from "react-native";
import { SkateProfile } from "../../types";
import SkateProfileSummary from "../profile/SkateProfileSummary";
import SkateProfilePresenceCard from "./SkateProfilePresenceCard";
interface Input {
    skateProfiles: Array<SkateProfile>
}
const SkateProfilesList = ({skateProfiles} : Input) =>{
    return(
        <ScrollView horizontal={true}>
            { skateProfiles !== undefined && skateProfiles !== null && skateProfiles.length !== 0 &&
                skateProfiles.map((skateProfile, index) => {
                    return(
                        <SkateProfilePresenceCard key={index} skateProfile={skateProfile}></SkateProfilePresenceCard>
                    )
                })
            }
        </ScrollView>
    );
}

export default SkateProfilesList;