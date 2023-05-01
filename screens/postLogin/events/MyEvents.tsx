import React from "react";
import { View } from 'react-native'

import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Text } from 'react-native-paper'

import { EventCard, GeneralHeader } from "../../../components/general";
import { SkateProfiles } from "../../../components/profile";
import { setCurrentSkateProfile } from "../../../redux/appState";
import { RootState } from "../../../redux/store";
import { Layout2PieceForNavigator } from "../../layouts";
import { scale, verticalScale } from "react-native-size-matters";

const MyEvents = () => {

  const {currentSkateProfile, user} = useSelector((state: RootState) => state.appState)
  const dispatch = useDispatch();
  const navigation = useNavigation();


  const getEvents = () => {
    if(currentSkateProfile !== undefined && currentSkateProfile !== null &&
      currentSkateProfile.events !==  null && currentSkateProfile.events !== undefined)
      {
        return currentSkateProfile.events.map(
          (evnt) => {
            return(
                <EventCard key={evnt.id} event={evnt}
                onPress={() => navigation.navigate('EventDisplay' as never, {event: evnt} as never)}></EventCard>
            );
        });
      }
      else {
        return <Text style={{textAlign: 'center', marginVertical: verticalScale(100),
      marginHorizontal: scale(15)}} variant="headlineSmall">You are not attending any event</Text>
      }
  }

  const getBody = () => {
    return(
      <View style={{justifyContent: 'space-evenly', alignItems: 'center'}}>
         {
        user !== undefined &&
        <SkateProfiles profiles={user?.skateProfiles} value={currentSkateProfile}
        onValueChange={(profile) => {dispatch(setCurrentSkateProfile(profile))}}></SkateProfiles>
        }
        {
          getEvents()
        }
      </View>
    );
  };
  
  return (
    <Layout2PieceForNavigator 
            header={ <GeneralHeader title="Your events" onChat={() => console.log("[MyEvents]: open chat")}></GeneralHeader>}
            body={getBody()}
    ></Layout2PieceForNavigator>
  );
};

export default MyEvents;