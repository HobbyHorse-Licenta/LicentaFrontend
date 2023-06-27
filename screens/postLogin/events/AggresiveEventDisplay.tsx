import React, {useEffect, useState, useRef} from "react";
import { View, ScrollView, StyleSheet, Platform } from 'react-native'

import { Text, useTheme } from "react-native-paper";
import { scale, verticalScale } from "react-native-size-matters";
import MapView, {LatLng, PROVIDER_GOOGLE} from 'react-native-maps';
import { useSelector } from "react-redux";
import { nothing } from "immer";

import {EventImage, GenderDisplay } from "../../../components/eventDisplay";
import { GeneralHeader, SvgView } from "../../../components/general";
import SkateProfilesList from "../../../components/general/SkateProfilesList";
import { LevelSvg } from "../../../components/svg/general";
import { RootState } from "../../../redux/store";
import { Fetch } from "../../../services";
import { SpacingStyles } from "../../../styles";
import { CustomTrail, Event, SkateProfile } from "../../../types";
import { filterUtils, mapsUtils, uiUtils, validation } from "../../../utils";
import { Layout2Piece } from "../../layouts";


const AggresiveEventDisplay = ({route, navigation}) => {

  const event: Event = route.params.event;
  const joined: boolean = route.params.joined;

  const customTrail: CustomTrail = event.outing.trail as CustomTrail;


  const mapRef = useRef<MapView | null>(null);
  const theme = useTheme();
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

  const getMap = () => {
    return(
        <MapView ref={mapRef} style={{height: '100%', width: '100%', zIndex: 0}}
        initialRegion={{
            latitude: customTrail.checkPoints[0].location.lat,
            longitude: customTrail.checkPoints[0].location.long,
            latitudeDelta: 0.00001,
            longitudeDelta: mapsUtils.kMToLongitudes(2, customTrail.checkPoints[0].location.lat)
        }}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        >
            {mapsUtils.getCustomTrailMarkers(customTrail.checkPoints, (index, changedCoordinated) => nothing, 0)}
            {mapsUtils.drawRoute(customTrail.checkPoints, customTrail.checkPoints.length + 2)}
        </MapView>
    );
  }

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

            <View style={[styles.rowContainer, {backgroundColor: theme.colors.background}]}>
                <SvgView size='small'>
                    <LevelSvg></LevelSvg>
                </SvgView>
                <Text style={[styles.descriptionText, {color: theme.colors.tertiary}]}>{event.skateExperience}</Text>
            </View>

            <View style={[styles.rowContainer, {backgroundColor: theme.colors.background}]}>
                <Text style={[styles.descriptionText]}>{uiUtils.getTimeRange(event.outing.startTime, event.outing.endTime)}</Text>
            </View>

            <View style={[styles.rowContainer, {backgroundColor: theme.colors.background}]}>
                <Text style={[styles.descriptionText]}>Days: </Text>
                {
                    event.outing.days.map((dayObject, index) => {
                        
                        return(
                            <View style={{flexDirection: 'row'}}>
                                { index !== 0 && <Text key={index} style={[styles.descriptionText]}>, </Text>}
                                <Text key={index} style={[styles.descriptionText]}>{dayObject.dayOfMonth}</Text>
                            </View>
                        )
                    })
                }
            </View>

            <View style={[styles.rowContainer, {backgroundColor: theme.colors.background}]}>
                <Text style={[styles.descriptionText]}>
                    Age range: {event.minimumAge} - {event.maximumAge}</Text>
            </View>

            <View style={[styles.rowContainer, {backgroundColor: theme.colors.background}]}>
                <Text style={[styles.descriptionText]}>Gender: {event.gender}</Text>
            </View>
      </View>
    )
  }

  const getBody = () => {
    return(
      <ScrollView>
        {getMap()}
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

export default AggresiveEventDisplay;

const styles = StyleSheet.create({
  descriptionText: {
      fontSize: verticalScale(10) < 10 ? 10 : verticalScale(10),
  },
  rowContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      margin: scale(4),
      paddingHorizontal: scale(7)
  },
  mapContainer: {
      margin: scale(20),
      width: 100,
      padding: scale(10)
  },
  image: {
    width: '100%',
    height: verticalScale(300),
    backgroundColor: 'black',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20
  },
})

