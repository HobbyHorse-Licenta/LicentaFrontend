import React, {useEffect, useState} from 'react'
import { Platform, View } from 'react-native';

import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { useTheme } from 'react-native-paper';
import * as Location from 'expo-location';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { mapsUtils } from '../../utils';
import { MarkerType } from '../../types';

const MapsBody = () => {

    const theme = useTheme();
    const {allParkTrails} = useSelector((state: RootState) => state.appState);

    const [initialRegion, setInitialRegion] = useState({
        latitude:  46.771069, 
        longitude: 23.596883,
    });
    const [myLocation, setMyLocation] = useState<Location.LocationObject>();

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


    const getAllParkTrailMarkers = () =>
    {
        if(allParkTrails !== undefined && allParkTrails !== null)
        {
            return mapsUtils.getParkTrailMarkers(allParkTrails);
        }
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
                getAllParkTrailMarkers()
            } 
            {
                myLocation !== undefined &&
                mapsUtils.getMarker({id: 'smth', lat: myLocation.coords.latitude,
                 long: myLocation.coords.longitude},'Your location', 1)
            }
            </MapView>
        </View>
      
    );
};

export default MapsBody;

