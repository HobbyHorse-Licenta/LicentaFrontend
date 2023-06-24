import React, {useEffect, useState} from "react";
import { View, ScrollView } from 'react-native'

import { Text } from "react-native-paper";
import { scale } from "react-native-size-matters";
import { useSelector } from "react-redux";

import {EventImage, GenderDisplay } from "../../../components/eventDisplay";
import { GeneralHeader } from "../../../components/general";
import SkateProfilesList from "../../../components/general/SkateProfilesList";
import { RootState } from "../../../redux/store";
import { Fetch } from "../../../services";
import { SpacingStyles } from "../../../styles";
import { Event, SkateProfile } from "../../../types";
import { filterUtils, validation } from "../../../utils";
import { Layout2Piece } from "../../layouts";


const EventDisplay = ({route, navigation}) => {

  const event: Event = route.params.event;
  const joined: boolean = route.params.joined;

  const {JWTTokenResult} = useSelector((state: RootState) => state.appState)
  const {currentSkateProfile} = useSelector((state: RootState) => state.globalState)
  const [suggestedSkateProfiles, setSuggestedSkateProfiles] = useState<Array<SkateProfile> | undefined>(undefined);
  const [attendingSkateProfiles, setAttendingSkateProfiles] = useState<Array<SkateProfile> | undefined>(undefined);

  useEffect(() => {
    if(currentSkateProfile !== undefined)
    {
      if(JWTTokenResult !== undefined && !validation.isJWTTokenExpired(JWTTokenResult))
      {
        Fetch.getSkateProfilesForEvent(JWTTokenResult.token,
          event.id,
          (skateProf) => setAttendingSkateProfiles(filterUtils.excludeSkateProfile(skateProf, currentSkateProfile)),
          () => console.log("Coudn't get attending skate profiles")
        );
        Fetch.getSuggestedSkateProfilesForEvent(JWTTokenResult.token,
          event.id,
          (skateProf) =>  setSuggestedSkateProfiles(filterUtils.excludeSkateProfile(skateProf, currentSkateProfile)),
          () => console.log("Coudn't get suggested skate profiles")
        );
      }
      else{
          //TODO refresh token
      }
     
    }
  }, [])

  const skatersInfo = () => {
    return(
      <View style={SpacingStyles.centeredContainer}>
          <View style={{margin: 10, justifyContent: 'center', alignItems: 'center'}}>
            <Text variant="headlineSmall" style={{marginBottom: scale(2)}}>Event's skaters</Text>
            <GenderDisplay gender={event.gender}></GenderDisplay>
            <Text variant="labelMedium">Skaters with opacity are just suggested</Text>
            <Text variant="labelMedium">Skater who are opaque are participating</Text>
          </View>
          {
            suggestedSkateProfiles !== undefined &&  suggestedSkateProfiles !== null &&
            attendingSkateProfiles !== undefined &&  attendingSkateProfiles !== null &&
             <SkateProfilesList suggestedSkateProfiles={suggestedSkateProfiles} attendingSkateProfiles={attendingSkateProfiles}></SkateProfilesList>
          }
      </View>
    )
  }

  const getBody = () => {
    return(
      <ScrollView>
        <EventImage event={event}></EventImage>
        {skatersInfo()}
      </ScrollView>
    );
  };
  
  return (
    <Layout2Piece
      header={<GeneralHeader onBack={() => navigation.goBack()} title={event.name}
      rightButtonEnable={true}
      onRightButtonPress={() => joined === true ? console.log("ceva"): console.log("altceva")}
      rightButtonText={joined === true ? "Leave" : "Join"}
      ></GeneralHeader>}
      body={getBody()}
    ></Layout2Piece>
  );
};

export default EventDisplay;

