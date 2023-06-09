import React, { useState, useEffect, useRef } from 'react';
import {View, StyleSheet, Platform, ViewStyle} from 'react-native';

import { scale, verticalScale } from 'react-native-size-matters';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Text, useTheme} from 'react-native-paper'
import * as ExpoLocation from 'expo-location';
import uuid from 'react-native-uuid';
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import {
useTourGuideController,
} from 'rn-tourguide'

import { LocationSvg } from '../svg/general';
import { Location, ParkTrail, Zone } from '../../types';
import { PrimaryContainer, SvgView } from '../general';
import {mapsUtils} from '../../utils';
import LoadingComponent from '../general/LoadingComponent';
import { useDispatch, useSelector } from 'react-redux';
import { setZone } from '../../redux/createScheduleState';
import { RootState } from '../../redux/store';
import OutsidePressHandler from 'react-native-outside-press';
import DropDownPicker from 'react-native-dropdown-picker';


interface Distance {
    label: string,
    value: number
}

interface Input {
    onTouchInside?: Function,
    onTouchOutside?: Function
    parkSelected: boolean,
    setParkSelected: Function
}

const SelectLocationCasualAndSpeed = ({onTouchInside, onTouchOutside, parkSelected, setParkSelected} : Input) => {

    const {currentSkateProfile, allParkTrails} = useSelector((state: RootState) => state.appState)
    const {zone} = useSelector((state: RootState) => state.createScheduleState)
    const [range, setRange] = useState<number>(1);
    const [dropdownPickerOpen, setDropDownPickerOpen] = useState(false);
    //const [parkSelected, setParkSelected] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<Location | undefined>({
        id: uuid.v4().toString(),
        name: 'Cluj-Napoca',
        lat: 46.770960,
        long:  23.596937
    });
    const dispatch = useDispatch();
    const theme = useTheme()
    //const wheelPickerRef = useRef<WheelPickerExpo | null>(null);
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


    //////FOR WALKTHROUGH////
    const {
        canStart, // a boolean indicate if you can start tour guide
        start, // a function to start the tourguide
        stop, // a function  to stopping it
        eventEmitter, // an object for listening some events
        TourGuideZone
      } = useTourGuideController('schedule')

    useEffect(() => {
        if (canStart) {
          start()
        }
    }, [canStart])   
    //////

    /* Gets and sets device location */
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
        if(selectedLocation !== undefined)
            mapsUtils.zoomMapInAndOut(mapRef, selectedLocation, range);

        updateZone();
    }, [range, selectedLocation])
    
    const updateZone = () => {
         if(selectedLocation !== undefined && range !== undefined && currentSkateProfile !== undefined)
         {
            const zone: Zone = {
                id: uuid.v4().toString(),
                range: range,
                locationId: selectedLocation.id,
                location: selectedLocation,
                scheduleId: currentSkateProfile.id
            }
            dispatch(setZone(zone));
         }
    }    
    
    const isParkInRange = (parkTrail: ParkTrail) : boolean => {
        if(zone !== undefined)
        {
            return mapsUtils.checkIfLocationInZone(parkTrail.location, zone);
        }
        else return false;
    }

    const findRangeBiggerThanDistance = (distance: number) : number =>{
        const range = rangeArray.find(({label, value}) => value >= distance);
        if(range !== undefined)
        {
            return range.value;
        }
        else return 100; //random range
    }
    const increaseRangeSoThatParkTrailIsInRange = (parkTrail: ParkTrail) => {
        if(zone !== undefined && zone !== null && zone.location !== undefined && zone.location !== null)
        {
            const distance = mapsUtils.getDistanceInKmBetweenLocations(zone.location, parkTrail.location);
            
            //find a range that covers this distance
            const suitableRange: number = findRangeBiggerThanDistance(distance)
            setRange(suitableRange);
        }
    }

    const getParkLocations = () =>
    {
        if(allParkTrails !== undefined && allParkTrails !== null)
        {
            return(
                <View>
                    {
                        allParkTrails.map((parkTrail, index) => {
                            const parkInRange = isParkInRange(parkTrail);
                            let parkOptionStyle: ViewStyle = {borderWidth: 1, borderColor: 'lightgrey'};
                            if(parkInRange === true)
                            {
                                setParkSelected(true);
                                parkOptionStyle = {...parkOptionStyle, backgroundColor: theme.colors.tertiary}
                            }
                            return(
                                <PrimaryContainer onPress={() => increaseRangeSoThatParkTrailIsInRange(parkTrail)} styleInput={{...parkOptionStyle, margin: scale(3)}}  key={index}>
                                    <Text>{parkTrail.name}</Text>
                                </PrimaryContainer>
                            )
                        })
                    }
                </View>
            )
        }
    }    

    const renderWheelPickerItem = (itemToRender) => {
        return(
            <Text style={{ alignSelf: 'center'}}>{itemToRender.label}</Text>
        );
    }
    
    // const getWheelPicker = () => {
    //     return
    //     (
    //         <WheelPickerExpo
    //             ref={wheelPickerRef}
    //             height={verticalScale(100)}
    //             width={scale(40)}
    //             initialSelectedIndex={0}
    //             items={rangeArray}
    //             onChange={( range ) => {onTouchOutside && onTouchOutside(); setRange(range.item.value); }}
    //             selectedStyle={{borderColor: theme.colors.tertiary, borderWidth: 1}}
    //             renderItem={(itemToRender) => renderWheelPickerItem(itemToRender)}
    //             haptics={false}
    //         /> 
    //     );
    // }

    const getDropDownPicker = () => {
        return(
            <DropDownPicker
            listMode='MODAL'
            placeholder='Select range'
            containerStyle={{width: scale(130)}}
            textStyle={{
            fontSize: scale(14),
            }}
            labelStyle={{
            fontWeight: "bold",
            color: theme.colors.tertiary,
            }}
            dropDownContainerStyle = {{
                flexWrap: 'nowrap'
            }}
            open={dropdownPickerOpen}
            value={range}
            items={rangeArray}
            setOpen={setDropDownPickerOpen}
            setValue={setRange}
            setItems={setRangeArray}
            zIndex={0}
            autoScroll={true}
            />
        )
    }

    return(
        <View >
            <PrimaryContainer styleInput={{padding: scale(10), marginVertical: scale(10)}}>
               
               <OutsidePressHandler disabled={false} onOutsidePress={() => {onTouchOutside && onTouchOutside()}}>

                <View onTouchStart={() => onTouchInside && onTouchInside()} style={{flexDirection: 'row', width: "100%", paddingBottom: verticalScale(5)}}>
                    <View style={{flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
                            <SvgView size='small' style={{backgroundColor: theme.colors.tertiary, borderRadius: 10}}>
                                <LocationSvg></LocationSvg>
                            </SvgView>
                        <Text variant='bodyLarge'>Location</Text>
                    </View>
                    
                    <View style={styles.picker}>
                        <View>
                        {
                            getDropDownPicker()
                        }
                        </View>
                        <Text>km</Text>
                    </View>

                </View>

                </OutsidePressHandler>
                {
                    selectedLocation !== undefined ? 
                    (
                        <TourGuideZone
                        zone={2}
                        text={"You can hold on maps to select a new location"}
                        borderRadius={16}
                        >
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
                            {mapsUtils.getMarker(selectedLocation, selectedLocation.name)}
                            {mapsUtils.getCircle(selectedLocation, range)}
                            {allParkTrails !== undefined && mapsUtils.getParkTrailMarkers(allParkTrails)}
                            </MapView>
                        </TourGuideZone>                        
                    ):
                    (
                        <LoadingComponent width={styles.mapFraction.width} height={styles.mapFraction.height}></LoadingComponent>
                    )
                }
                <View>
                {
                    getParkLocations()
                }
                </View>
            </PrimaryContainer>
        </View>
      
    );
};

export default SelectLocationCasualAndSpeed;

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