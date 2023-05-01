import React, { useState, useEffect, useRef, RefObject } from 'react';
import {View, StyleSheet, Platform} from 'react-native';

import { scale, verticalScale } from 'react-native-size-matters';
import MapView, {Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Text, useTheme} from 'react-native-paper'
import * as ExpoLocation from 'expo-location';
import OutsidePressHandler from 'react-native-outside-press';
import uuid from 'react-native-uuid';
import WheelPickerExpo from 'react-native-wheel-picker-expo';

import { SpacingStyles } from "../../styles";
import { FemaleSvg, LocationSvg } from '../svg/general';
import { Location, Zone } from '../../types';
import { PrimaryContainer, SvgView } from '../general';
import Fetch from '../../services/Fetch';
import { SafeAreaView } from 'react-navigation';
import {mapsUtils} from '../../utils';
import { TennisSvg } from '../svg/sports';
import LoadingComponent from '../general/LoadingComponent';
import { useDispatch } from 'react-redux';
import { setZone } from '../../redux/createScheduleState';

interface Distance {
    label: string,
    value: number
}

interface Input {
    onTouchInside?: Function,
    onTouchOutside?: Function
}

const SelectLocation = ({onTouchInside, onTouchOutside}) => {

    //TODO: fix WheelPickerExpo not working when in ScrollView

    const [selectedLocation, setSelectedLocation] = useState<Location | undefined>(undefined);
    const dispatch = useDispatch();
    const [range, setRange] = useState<number>(1);
    const theme = useTheme();
    const mapRef = useRef<MapView | null>(null);
    const [rangeArray, setRangeArray] = useState<Distance[]>([
        {label: '+0.2', value: 0.2},
        {label: '+0.5', value: 0.5},
        {label: '+0.8', value: 0.8},
        {label: '+1', value: 1},
        {label: '+1.5', value: 1.5},
        {label: '+2', value: 2},
        {label: '+3', value: 3},
        {label: '+4', value: 4},
        {label: '+5', value: 5},
        {label: '+10', value: 10},
        {label: '+15', value: 15},

    ]);

    

    useEffect(() => {
        (async () => {
          
          let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
          }
    
          let location = await ExpoLocation.getCurrentPositionAsync({});

          if(mapRef.current != null)
            mapRef.current.animateToRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.00001,
                longitudeDelta: mapsUtils.kMToLongitudes(range, location.coords.latitude)
              }, 1000)

          setSelectedLocation({id: uuid.v4().toString(), 
                        name: 'Your Location',
                        lat: location.coords.latitude,
                        long: location.coords.longitude,
            });

        })();
    }, []);

    useEffect(() => {
        Fetch.getLocation('Cluj-Napoca',
        (locationFromDb) => {selectedLocation === undefined && setSelectedLocation(locationFromDb)},
        () => console.log("Coudn't get Cluj-Napoca location"));
       
    }, [])

    useEffect(() => {
        zoomMapInAndOut(mapRef, range);

        //update zone
        if(selectedLocation !== undefined && range !== undefined)
        {
            const zone: Zone = {
                id: uuid.v4().toString(),
                range: range,
                location: selectedLocation
            }
            dispatch(setZone(zone));
        }
    }, [range, selectedLocation])

    const zoomMapInAndOut = (mapReference: RefObject<MapView>, rangeInKm: number) =>
    {
        if(mapReference !== null && mapReference.current !== null && selectedLocation !== undefined)
        {
            mapReference.current.animateToRegion({
                latitude: selectedLocation.lat,
                longitude: selectedLocation.long,
                latitudeDelta: 0.00001,
                longitudeDelta: mapsUtils.kMToLongitudes(range, selectedLocation.lat),
              }, 1000)
        }
    }
    const getMarker = (location: Location, markerTitle: string | undefined) => {
        return(
            <Marker
                key={1}
                coordinate={{
                    latitude: location.lat,
                    longitude: location.long
                }}
                title={markerTitle !== undefined ? markerTitle : ''}

                style={{width: 1, height: 1}}
                pinColor={'wheat'}
            />
        )
    }
    const getCircle = (location: Location, rangeInKm: number) => {
        return(
            <Circle 
            strokeWidth={2}
            strokeColor={theme.colors.tertiary}
            fillColor={'rgba(248,95,96,0.2)'}
            center={{latitude: location.lat,
                longitude: location.long}}
                radius={rangeInKm *  1000}
            />
        )
    }

    const renderWheelPickerItem = (itemToRender) => {
        return(
            <Text style={{ alignSelf: 'center'}}>{itemToRender.label}</Text>
        );
    }
    // <OutsidePressHandler  onOutsidePress={() =>  onTouchOutside !== undefined && onTouchOutside()} disabled={false}>
    return(
        <View >
            <PrimaryContainer styleInput={{padding: scale(10), marginVertical: scale(10)}}>
               
                <View onTouchStart={() => onTouchInside && onTouchInside()} style={{flexDirection: 'row', paddingBottom: verticalScale(5)}}>
                    <View style={{flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
                        <SvgView size='small' style={{backgroundColor: theme.colors.tertiary, borderRadius: 10}}>
                            <LocationSvg></LocationSvg>
                        </SvgView>

                        <Text variant='bodyLarge'>Location</Text>
                    </View>
                    
                    <View style={styles.picker}>
                        <WheelPickerExpo
                        height={verticalScale(100)}
                        width={scale(40)}
                        initialSelectedIndex={0}
                        items={rangeArray.map(range => ({ label: range.label, value: range.label}))}
                        onChange={( range ) => { onTouchOutside && onTouchOutside(); setRange(range.item.value); }}
                        selectedStyle={{borderColor: theme.colors.tertiary, borderWidth: 1}}
                        renderItem={(itemToRender) => renderWheelPickerItem(itemToRender)}
                        haptics={false}
                        />
                        <Text>km</Text>
                    </View>

                </View>

                {
                    selectedLocation !== undefined ? 
                    (
                        <MapView ref={mapRef} style={styles.mapFraction}
                        initialRegion={{
                            latitude: selectedLocation.lat,
                            longitude: selectedLocation.long,
                            latitudeDelta: 0.00001,
                            longitudeDelta: mapsUtils.kMToLongitudes(range, selectedLocation.lat)
                        }}
                        onLongPress={({nativeEvent}) => setSelectedLocation((prevLocation) => {
                         const {coordinate} = nativeEvent;
                            const newLocation :  Location = {
                            ...prevLocation,
                            id: uuid.v4().toString(),
                            lat: coordinate.latitude,
                            long: coordinate.longitude
                            };
                            return newLocation;
                         })}
                        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
                        >
                        {getMarker(selectedLocation, selectedLocation.name)}
                        {getCircle(selectedLocation, range)}
                        </MapView>
                    ):
                    (
                        <LoadingComponent width={styles.mapFraction.width} height={styles.mapFraction.height}></LoadingComponent>
                        )
                    }
                
            
            </PrimaryContainer>
        </View>
      
    );
};

export default SelectLocation;

const styles = StyleSheet.create({
    picker: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: scale(10)
    },
    mapFraction: {
        width: scale(300),
        height: verticalScale(200)
    }
});