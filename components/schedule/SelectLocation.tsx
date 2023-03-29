import React, { useState, useEffect, useRef } from 'react';
import {View, StyleSheet, Platform} from 'react-native';

import { scale, verticalScale } from 'react-native-size-matters';
import MapView, {Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Text, useTheme} from 'react-native-paper'
import * as ExpoLocation from 'expo-location';
import uuid from 'react-native-uuid';
import WheelPickerExpo from 'react-native-wheel-picker-expo';

import { SpacingStyles } from "../../styles";
import { FemaleSvg, LocationSvg } from '../svg/general';
import { Location } from '../../types';
import { PrimaryContainer } from '../general';
import Fetch from '../../services/Fetch';
import { SafeAreaView } from 'react-navigation';
import maps from '../../utils/Maps';
import { TennisSvg } from '../svg/sports';

interface Distance {
    label: string,
    value: number
}

const SelectLocation = () => {

  
    const [myLocation, setMyLocation] = useState<Location>({
        id: uuid.v4().toString(),
        name: 'Cluj-Napoca',
        gpsPoint: {
            lat:  46.771069, 
            long: 23.596883,
        }
    });
    const [rangeArray, setRangeArray] = useState<Distance[]>([
        {label: '+1', value: 1},
        {label: '+2', value: 2},
        {label: '+3', value: 3},
        {label: '+4', value: 4},
        {label: '+5', value: 5},
        {label: '+10', value: 10},
        {label: '+15', value: 15},
        {label: '+30', value: 30},
        {label: '+60', value: 60},
        {label: '+100', value: 100},

    ]);
    const [range, setRange] = useState<number>(1);

    const theme = useTheme();
    const mapRef = useRef<MapView | null>(null);

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
                longitudeDelta: maps.kMToLongitudes(range, myLocation.gpsPoint.lat)
              }, 1000)

          setMyLocation({id: uuid.v4().toString(), name: 'Your Location', gpsPoint: {
            lat: location.coords.latitude,
            long: location.coords.longitude,
          }});

        })();
    }, []);

    useEffect(() => {
        const variable = Fetch.getLocation('Cluj-Napoca');
        if( variable != null)
        {
            setMyLocation(variable);
        }
    }, [])

    useEffect(() => {
        if(mapRef !== null && mapRef.current !== null && myLocation !== undefined)
        {
            mapRef.current.animateToRegion({
                latitude: myLocation.gpsPoint.lat,
                longitude: myLocation.gpsPoint.long,
                latitudeDelta: 0.00001,
                longitudeDelta: maps.kMToLongitudes(range, myLocation.gpsPoint.lat),
              }, 1000)
        }
    }, [range])

    const renderWheelPicker = (itemToRender) => {
        return(
            <Text style={{margin: verticalScale(3), alignSelf: 'center'}}>{itemToRender.label}</Text>
        );
    }
    
    return(
        <PrimaryContainer styleInput={{padding: scale(10), marginVertical: scale(10)}}>
            <View style={{flexDirection: 'row', paddingBottom: verticalScale(5)}}>
                <View style={{flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={[SpacingStyles.tile, {backgroundColor: theme.colors.tertiary, borderRadius: 10}]}>
                        <LocationSvg></LocationSvg>
                    </View>

                    <Text variant='bodyLarge'>Location</Text>
                </View>
                
                <View style={styles.picker}>
                    <WheelPickerExpo
                    height={verticalScale(100)}
                    width={scale(40)}
                    initialSelectedIndex={0}
                    items={rangeArray.map(range => ({ label: range.label, value: range.label}))}
                    onChange={( range ) => {setRange(range.item.value)}}
                    selectedStyle={{borderColor: theme.colors.tertiary, borderWidth: 1}}
                    renderItem={(itemToRender) => renderWheelPicker(itemToRender)}
                    haptics={false}
                    />
                    <Text>km</Text>
                </View>

            </View>
            <MapView ref={mapRef} style={styles.mapFraction}
                        initialRegion={{
                        latitude: myLocation.gpsPoint.lat,
                        longitude: myLocation.gpsPoint.long,
                        latitudeDelta: 0.00001,
                        longitudeDelta: maps.kMToLongitudes(range, myLocation.gpsPoint.lat)
                        }}
                        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
                        
            >
            <Marker
                key={1}
                coordinate={{
                    latitude: myLocation.gpsPoint.lat,
                    longitude: myLocation.gpsPoint.long
                }}
                title={'Your location'}
                
                style={{width: 1, height: 1}}
                pinColor={'wheat'}
            />
            <Circle 
            strokeWidth={2}
            strokeColor={theme.colors.tertiary}
            fillColor={'rgba(248,95,96,0.2)'}
            center={{latitude: myLocation.gpsPoint.lat,
                longitude: myLocation.gpsPoint.long}}
                radius={range *  1000}/>
            </MapView>
        </PrimaryContainer>
      
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