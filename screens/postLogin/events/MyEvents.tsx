import React, {useState, useEffect} from "react";
import { ScrollView, View } from 'react-native'

import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { AggresiveEventCard, EventCard, GeneralHeader, InformationalSvgComponent, LoadingComponent, PrimaryContainer } from "../../../components/general";
import { SkateProfiles } from "../../../components/profile";
import { setNeedsEventsRefresh } from "../../../redux/appState";
import { RootState } from "../../../redux/store";
import { Layout2PieceForNavigator } from "../../layouts";
import { scale, verticalScale } from "react-native-size-matters";
import { EmptyBoxSvg } from "../../../components/svg/general";
import { Fetch } from "../../../services";
import { uiUtils, validation } from "../../../utils";
import { Event, SkatePracticeStyles } from "../../../types";
import { SpacingStyles } from "../../../styles";
import { setCurrentSkateProfile } from "../../../redux/globalState";

const MyEvents = () => {

  const { user, needsEventsRefresh, JWTTokenResult} = useSelector((state: RootState) => state.appState);
  const {currentSkateProfile} = useSelector((state: RootState) => state.globalState);
  const [events, setEvents] = useState<Array<Event>>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    getAndSetMyEvents();
  }, [currentSkateProfile])  

  useEffect(() => {
    if(needsEventsRefresh === true)
    {
      getAndSetMyEvents();
      getAndSetMyEvents();
      dispatch(setNeedsEventsRefresh(false));
    }
  }, [needsEventsRefresh])

  const getAndSetMyEvents = () => {
    setLoading(true);

    if(currentSkateProfile !== undefined)
      {
        console.log("Refreshing MY EVENTS");
        if(JWTTokenResult !== undefined && !validation.isJWTTokenExpired(JWTTokenResult))
        {
          Fetch.getEventsForSkateProfile(JWTTokenResult.token, currentSkateProfile.id,
              (joinedEvents) => {setEvents(joinedEvents), setLoading(false);},
              () => {setEvents([]);  uiUtils.showPopUp("Error", "Database is not working\nWe couldn't load user events"); setLoading(false);}
          );
        }
        else{
            //TODO refresh token
        }
        
      }
      else setLoading(false);
  }

  const getBody = () => {
    return(
      <View style={{justifyContent: 'space-evenly', alignItems: 'center'}}>
         {
        user !== undefined &&
        <SkateProfiles style={{margin: scale(20)}} profiles={user?.skateProfiles} value={currentSkateProfile}
        onValueChange={(profile) => {setLoading(true); dispatch(setCurrentSkateProfile(profile))}}></SkateProfiles>
        }
        {
          loading === true ?
          (
            <PrimaryContainer styleInput={SpacingStyles.eventCard}>
              <LoadingComponent height={SpacingStyles.eventCard.height} width={SpacingStyles.eventCard.width}></LoadingComponent>
            </PrimaryContainer>
          ):
          (
            events !==  null && events !== undefined && events.length > 0 ? 
            (
              <ScrollView style={{width: "98%"}}>
                {
                  events.map((evnt, index) => {
                    if(currentSkateProfile !== undefined && currentSkateProfile !== null
                      && currentSkateProfile.skatePracticeStyle === SkatePracticeStyles.AggresiveSkating)
                    {
                        return(
                            <AggresiveEventCard key={index} event={evnt} joined={true}
                            onPress={() => navigation.navigate('AggresiveEventDisplay' as never, {event: evnt, joined: true} as never)}></AggresiveEventCard>
                          
                        )
                    }
                    else
                    {
                      return(
                          <EventCard key={index} event={evnt} joined={true}
                          onPress={() => navigation.navigate('EventDisplay' as never, {event: evnt, joined: true} as never)}></EventCard>
                      );
                    } 
                  })
                }
              </ScrollView>
              
            ):(
                <InformationalSvgComponent
                    headline="You are not attending any event"
                    body="Check out the event section. If there are events available, select something appealing to you"
                    svgElement={<EmptyBoxSvg></EmptyBoxSvg>}
                />
            )
          )
        }
      </View>
    );
  };
  
  return (
    <Layout2PieceForNavigator 
            header={ <GeneralHeader title="My events"></GeneralHeader>}
            body={getBody()}
    ></Layout2PieceForNavigator>
  );
};

export default MyEvents;