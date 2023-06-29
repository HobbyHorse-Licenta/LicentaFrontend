import React, {useEffect, useState} from 'react'
import { Platform, View } from 'react-native';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { useTheme } from 'react-native-paper';
import * as Location from 'expo-location';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import { mapsUtils, uiUtils, validation } from '../../utils';
import { Event } from '../../types';
import { Fetch } from '../../services';
import { Button } from '../general';
import { scale, verticalScale } from 'react-native-size-matters';
import { SpacingStyles } from '../../styles';

let mapsElementCount = 0;

const MapsBody = () => {

    const theme = useTheme();
    const [events, setEvents] = useState<Array<Event>>([]);
    const [parkTrailsVisible, setParkTrailsVisible] = useState(false);
    const {needsEventsRefresh, allParkTrails, JWTTokenResult} = useSelector((state: RootState) => state.appState);
    const {currentSkateProfile} = useSelector((state: RootState) => state.globalState);

    
    const [initialRegion, setInitialRegion] = useState({
        latitude:  46.771069, 
        longitude: 23.596883,
    });
    const [myLocation, setMyLocation] = useState<Location.LocationObject>();

    useEffect(() => {
        getAndSetMyEvents();
    }, [currentSkateProfile])
    
    useEffect(() => {
        if(needsEventsRefresh === true)
        {
            getAndSetMyEvents();
        }
    }, [needsEventsRefresh])

    useEffect(() => {
        
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setMyLocation(location);
        })();
    }, []);
    
    useEffect(() => {
        if(myLocation != undefined)
            console.log("LOCATION lat: " + myLocation.coords.latitude + "; long: " + myLocation.coords.longitude );
    }, [myLocation])

    const getAndSetMyEvents = () => {
        if(currentSkateProfile !== undefined)
        {
            if(JWTTokenResult !== undefined && !validation.isJWTTokenExpired(JWTTokenResult))
            {
                Fetch.getEventsForSkateProfile(JWTTokenResult.token,
                    currentSkateProfile.id,
                    (myEvents) => {setEvents(myEvents);},
                    () => { setEvents([]); uiUtils.showPopUp("Error", "Database is not working\nWe couldn't load recommended events");});
            }
            else{
                //TODO refresh token
            }
            
        }
    }

    const getAllParkTrailMarkers = () =>
    {
        if(allParkTrails !== undefined && allParkTrails !== null)
        {
            mapsElementCount = allParkTrails.length;
            return mapsUtils.getParkTrailMarkers(allParkTrails, 0);
        }
    }

    const getTopButtons = () => {
        return(
            <View style={[SpacingStyles.shadow, {position: "absolute", top: verticalScale(10), left: scale(50), borderRadius: 50, opacity: 0.8}]}>
                <Button style={{backgroundColor: theme.colors.secondary, ...SpacingStyles.shadow}} text={parkTrailsVisible === true ? 'Hide ParkTrails' : "Show ParkTrails"}
                onPress={() => setParkTrailsVisible(prevValue =>  !prevValue)}></Button>    
            </View>
        )
    }
    return(
        <View>
            <MapView style={{width: '100%', height: '100%'}}
                initialRegion={{
                latitude: initialRegion.latitude,
                longitude: initialRegion.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
                provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
            >
            {
                parkTrailsVisible === true &&
                getAllParkTrailMarkers()
            } 
            {
                mapsUtils.getAttendingEvents(events, mapsElementCount + 1)
            }
            {
                myLocation !== undefined &&
                mapsUtils.getMarker({id: 'smth', lat: myLocation.coords.latitude,
                 long: myLocation.coords.longitude},'Your location', mapsElementCount + events.length + 1)
            }
            </MapView>
            {
              getTopButtons()
            }
        </View>
      
    );
};

export default MapsBody;

