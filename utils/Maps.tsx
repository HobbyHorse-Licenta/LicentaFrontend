import React from 'react'
import {RefObject} from 'react'
import { Location } from '../types';
import MapView, { Circle, LatLng, Marker } from "react-native-maps";
import { useTheme } from 'react-native-paper';
import Constants from 'expo-constants';

import { COLORS } from '../assets/colors/colors';
import MapViewDirections from 'react-native-maps-directions';


class Maps {
    radiansToDegrees(angle): number {
    return angle * (180 / Math.PI);
    }
    
    degreesToRadians(angle) {
    return angle * (Math.PI / 180);
    }
    
    latitudesToKM(latitudes) {
    return latitudes * 110.574;
    }
    
    kMToLatitudes(km) {
    return km / 110.574;
    }
    
    longitudesToKM(longitudes, atLatitude) {
    return longitudes * 111.32 * Math.cos(this.degreesToRadians(atLatitude));
    }
    
    kMToLongitudes(km, atLatitude) {
    return km * 0.0200000 / Math.cos(this.degreesToRadians(atLatitude));
    }

    zoomMapInAndOut(mapReference: RefObject<MapView>, currentLocation: Location, rangeInKm: number)
    {
        if(mapReference !== null && mapReference.current !== null && currentLocation !== undefined)
        {
            mapReference.current.animateToRegion({
                latitude: currentLocation.lat,
                longitude: currentLocation.long,
                latitudeDelta: 0.00001,
                longitudeDelta: mapsUtils.kMToLongitudes(rangeInKm, currentLocation.lat),
              }, 1000)
        }
    }

    /* Returns JSX element */
    getCircle (location: Location, rangeInKm: number) {
        return(
            <Circle 
            strokeWidth={2}
            strokeColor={COLORS.aPrimaryColorOverall}
            fillColor={'rgba(248,95,96,0.2)'}
            center={{latitude: location.lat,
                longitude: location.long}}
                radius={rangeInKm *  1000}
            />
        )
    }

    /* Returns JSX element */
    getMarker (location: Location, markerTitle: string | undefined, key?: number, changedCoordinates?: Function) {
        return(
            <Marker
                key={key !== undefined ? key : 1}
                coordinate={{
                    latitude: location.lat,
                    longitude: location.long
                }}
                draggable={true}
                onDragEnd={(e) => changedCoordinates !== undefined && changedCoordinates(e.nativeEvent.coordinate)}
                title={markerTitle !== undefined ? markerTitle : ''}

                style={{width: 1, height: 1}}
                pinColor={'wheat'}
            />
        )
    }

    getDrawnRoute (startLocation: Location, endLocation: Location,  key?: number) {
        //TODO manage this sensitive information
        const googleApiKey = "AIzaSyDeW3jVm5zRot2iSvnb28oi4jUF6SfpwD0";

        return(
            <MapViewDirections
            mode="WALKING"
            key={key !== undefined ? key : 1}
            origin={{latitude: startLocation.lat, longitude: startLocation.long}}
            destination={{latitude: endLocation.lat, longitude: endLocation.long}}
            apikey={googleApiKey}
            strokeWidth={3}
            strokeColor={COLORS.aPrimaryColorOverall}
            />
        )
    }

}
    const mapsUtils = new Maps();
    export default mapsUtils;
  
  
  
  
  