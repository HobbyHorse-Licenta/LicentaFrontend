import React, {useEffect, useState} from "react";
import { View, Text } from 'react-native'
import {EventImage } from "../../../components/eventDisplay";
import { GeneralHeader } from "../../../components/general";
import SkateProfilesList from "../../../components/general/SkateProfilesList";
import { Fetch } from "../../../services";
import { SpacingStyles } from "../../../styles";

import { Event, SkateProfile } from "../../../types";
import { Layout2Piece } from "../../layouts";

interface EventInput {
    event: Event
}

const EventDisplay = ({route, navigation}) => {

  const event: Event = route.params.event;

  const [suggestedSkateProfiles, setSuggestedSkateProfiles] = useState<Array<SkateProfile> | undefined>(undefined);
  const [attendingSkateProfiles, setAttendingSkateProfiles] = useState<Array<SkateProfile> | undefined>(undefined);

  useEffect(() => {
    Fetch.getSkateProfilesForEvent(
      event.id,
      (skateProf) => setAttendingSkateProfiles(skateProf),
      () => console.log("Coudn't get attending skate profiles")
    );
    Fetch.getSuggestedSkateProfilesForEvent(
      event.id,
      (skateProf) => setSuggestedSkateProfiles(skateProf),
      () => console.log("Coudn't get suggested skate profiles")
    );
    
  }, [])
  
  //  console.log("\n\n\nSKATINGPROFILES ALLLL: " + JSON.stringify(skateProfiles));
   
  const getBody = () => {
    return(
      <View>
        <EventImage event={event}></EventImage>
        <View style={SpacingStyles.centeredContainer}>
          <Text>Skaters attending</Text>
          {
            suggestedSkateProfiles !== undefined &&  suggestedSkateProfiles !== null &&
            attendingSkateProfiles !== undefined &&  attendingSkateProfiles !== null &&
             <SkateProfilesList suggestedSkateProfiles={suggestedSkateProfiles} attendingSkateProfiles={attendingSkateProfiles}></SkateProfilesList>
          }
        </View>
      </View>
    );
  };
  
  return (
    <Layout2Piece
      header={<GeneralHeader onBack={() => navigation.goBack()} title={event.name}></GeneralHeader>}
      body={getBody()}
    ></Layout2Piece>
  );
};

export default EventDisplay;