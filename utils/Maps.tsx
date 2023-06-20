import React from 'react'
import {RefObject} from 'react'
import {Platform} from 'react-native'
import { CheckPoint, Location, MarkerType, ParkTrail, Zone } from '../types';
import MapView, { Circle, LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";

import { useTheme } from 'react-native-paper';
import Constants from 'expo-constants';

import { COLORS } from '../assets/colors/colors';
import MapViewDirections from 'react-native-maps-directions';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import uuid from 'react-native-uuid'
import { Image } from 'react-native';


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

    getDistanceInKmBetweenLocations(location1: Location, location2: Location)
    {
        const earthRadiusKm: number = 6371; // Approximate radius of the Earth in kilometers

        const dLat: number = this.degreeToRadian(location1.lat - location2.lat);
        const dLon: number = this.degreeToRadian(location1.long - location2.long);

        const a: number = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                       Math.cos(this.degreeToRadian(location2.lat)) * Math.cos(this.degreeToRadian(location1.lat)) *
                       Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distanceInKm: number = earthRadiusKm * c;
        return distanceInKm;
    }
    checkIfLocationInZone(location: Location, zone: Zone)
    {
        if(zone !== undefined)
        {
            const distanceInKm: number = this.getDistanceInKmBetweenLocations(location, zone.location);
            if (distanceInKm <= zone.range)
                return true;
            else return false;
        }
        return false;
    }

    degreeToRadian(degree: number)
    {
        return degree * Math.PI / 180;
    }

    /* Returns JSX element */
    getParkTrailMarkers (parkTrails: Array<ParkTrail>) {
        return parkTrails.map((parkTrail, index) => {
            return(
                <Marker
                key={index}
                coordinate={{
                    latitude: parkTrail.location.lat,
                    longitude: parkTrail.location.long
                }}
                image={{uri: "https://i.postimg.cc/mrXQvdzc/running-track.png"}}
                //image={require('../assets/mapMarkers/running-track.png')}

                style={{width: 1, height: 1}}
                title={parkTrail.name}
                >
                </Marker>
            )
        })
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
                image={require('../assets/mapMarkers/map_marker.png')}
                style={{width: 1, height: 1}}
                pinColor={'wheat'}
            />
        )
    }

    /* Returns JSX element */
    getCustomMarker (markerType:MarkerType, location: Location, markerTitle: string | undefined, key?: number, changedCoordinates?: ((coordinates: LatLng) => void)) {
        const getImage = () => {
            switch (markerType) {
                case MarkerType.Checkpoint:
                    return {uri: "https://i.postimg.cc/TPjQLj4Q/checkpoint.png"}    
                    return require('../assets/mapMarkers/checkpoint.png');
                    break;
                case MarkerType.Finish:
                    return {uri: "https://i.postimg.cc/CLZNHp2R/finish.png"}    
                    return require('../assets/mapMarkers/finish.png');
                    break;
                case MarkerType.Start:
                    return {uri: "https://i.postimg.cc/Wz7wtsY3/start.png"}
                    return require('../assets/mapMarkers/start.png');
                    break;
                default: 
                    return {uri: "https://i.postimg.cc/63rmLJ1s/map-marker.png"}
                    return require('../assets/mapMarkers/map_marker.png'); 
                    break;
            }
        }
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
                image={getImage()}
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

    /** draws route using checkpoints*/
    drawRoute (checkPoints: Array<CheckPoint>) {
        const smallRoutes: Array<JSX.Element> = []
        if(checkPoints === undefined)
            return null;
        if(checkPoints.length < 2)
            return null;
        for (let i = 0; i < checkPoints.length - 1; i++) {
            const element = this.getDrawnRoute(checkPoints[i].location, checkPoints[i+1].location, i);
            smallRoutes.push(element);
        }
        return smallRoutes;
    }

    /** draws checkpoints from a custom trail*/
    getCustomTrailMarkers(checkPoints: Array<CheckPoint>, updateCheckpointCoordinates: ((indexOfChekpoint: number, changedCoordinates: LatLng) => void)){
        if(checkPoints !== undefined)
        {
            return checkPoints.map(
            (checkpoint, index) => 
            {
                let markerType: MarkerType;
                if(index === 0)
                {
                    markerType = MarkerType.Start;
                }
                else if(index === checkPoints.length - 1)
                {
                    markerType = MarkerType.Finish;
                }
                else{
                    markerType = MarkerType.Checkpoint;
                }
                return mapsUtils.getCustomMarker(markerType, checkpoint.location, undefined, index,
                (changedCoordinates) => {
                    updateCheckpointCoordinates(index, changedCoordinates);
                });
            });
        }
        else return null;
    }


    /** wraps to size of parent */
    getUneditableCustomTrailMap (mapRef:  React.RefObject<MapView>, centeredLocation: Location, 
        checkPoints: Array<CheckPoint>, updateCheckpoint: (checkpointIndex: number, newCheckpointCoordinates: LatLng) => void) {
        return(
            <MapView ref={mapRef} style={{height: '100%', width: '100%', zIndex: 0}}
            scrollEnabled={false}
            zoomEnabled={false}
            initialRegion={{
                latitude: centeredLocation.lat,
                longitude: centeredLocation.long,
                latitudeDelta: 0.00001,
                longitudeDelta: mapsUtils.kMToLongitudes(2, centeredLocation.lat)
            }}
            provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
            >
                {this.getCustomTrailMarkers(checkPoints, updateCheckpoint)}
                {this.drawRoute(checkPoints)}
            </MapView>
        );
    }

}
    const mapsUtils = new Maps();
    export default mapsUtils;
  
  
  
  
  