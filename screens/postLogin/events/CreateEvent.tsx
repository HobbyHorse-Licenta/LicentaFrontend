import React, {useRef, useState, useEffect} from 'react'
import { View, StyleSheet, Platform, Pressable, ScrollView, Image, TouchableOpacity, Button as ReactNativeButton } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { scale, verticalScale } from 'react-native-size-matters';
import uuid from 'react-native-uuid'
import MapView, {LatLng, PROVIDER_GOOGLE} from 'react-native-maps';
import { Text, TextInput, useTheme } from 'react-native-paper';
import Popover from 'react-native-popover-view/dist/Popover';
import { Rect } from 'react-native-popover-view';
import ViewShot, { captureRef } from 'react-native-view-shot';


import { Button, GeneralHeader, LoadingComponent, PrimaryContainer, RectangularPicture } from '../../../components/general';
import { Layout2Piece } from '../../layouts';
import { mapsUtils, uiUtils, validation } from '../../../utils';
import { CheckPoint, Location, Day, Gender, Event, SkateExperience, SkatePracticeStyles, CustomTrail, AggresiveEvent, MarkerType } from '../../../types';
import { SpacingStyles } from '../../../styles';
import { SelectAgeGap, SelectDays, SelectHourRange, SelectNumberOfPeople } from '../../../components/schedule';
import SelectGender from '../../../components/createEvent/SelectGender';
import { setMaxNumberOfPeople } from '../../../redux/createScheduleState';
import { useDispatch, useSelector } from 'react-redux';
import { addAggresiveEventToUser, setJWTTokenResult } from '../../../redux/appState';
import { RootState } from '../../../redux/store';
import { Fetch } from '../../../services';

const containersWidth = scale(290);

const CreateEvent = () => {

    const {JWTTokenResult} = useSelector((state: RootState) => state.appState)
    const {currentSkateProfile} = useSelector((state: RootState) => state.globalState)
    const navigation =  useNavigation();
    const mapRef = useRef<MapView | null>(null);
    const theme = useTheme();
    const dispatch = useDispatch();
    let timoutId;

    ////////////EVENT INFO/////////
    const [eventName, setEventName] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [checkPointsArray, setCheckPointsArray] = useState<Array<CheckPoint>>([]);
    const [startTime, setStartTime] = useState<Date>(new Date())
    const [endTime, setEndTime] = useState<Date>(new Date())
    const [eventImage, setEventImage] = useState<string>();
    const [selectedDays, setSelectedDays] = useState<Array<Day>>([]);
    const [minimumAge, setMinimumAge] = useState<number | undefined>();
    const [maximumAge, setMaximumAge] = useState<number>();
    const [numberOfPartners, setNumberOfPartners] = useState<number>();
    const [gender, setGender] = useState<Gender | undefined>();
    /////////////////////

    //const [mapSnapshot, setMapSnapshot] = 
    const [eventImageLoading, setEventImageLoading] = useState(false);
    const [fullScreenMap, setFullScreenMap] = useState(false);
    const [markerPopOverPosition, setMarkerPopOverPosition] = useState({x: 0, y: 0}) 
    const [markerPopOverVisible, setMarkerPopOverVisible] = useState(false) 
    const [selectedLocation, setSelectedLocation] = useState<Location | undefined>();
    const [centeredLocation, setCenteredLocation] = useState<Location>({
        id: uuid.v4().toString(),
        name: 'Cluj-Napoca',
        lat: 46.770960,
        long:  23.596937
    });

    
    useEffect(() => {
      if(fullScreenMap === false && mapRef.current !== null)
      {
        console.log("Minimizing map")
        const coordinates = checkPointsArray.map((checkPoint) => {
            return {latitude: checkPoint.location.lat, longitude: checkPoint.location.long}
        })

        console.log("Fitting all markers in the view");
        mapRef.current.fitToCoordinates(coordinates, {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
            animated: true,
        })

        console.log("Capturing map snapshot now");
        captureMap();
      }
    }, [fullScreenMap])
   

    const captureMap = async () => {
        const result = await captureRef(mapRef, {
          format: 'jpg',
          quality: 1,
        });
        console.log(result);
    };

    const createEvent = () => 
    {
        if(description !== undefined && numberOfPartners !== undefined && eventName !== undefined
            && gender !== undefined && currentSkateProfile !== undefined &&
            maximumAge !== undefined && minimumAge !== undefined)
        {
            console.log("creating event");
            const eventId = uuid.v4().toString();

            const customTrail: CustomTrail = {
                id: checkPointsArray[0].customTrailId,
                name: "RANDOM NAME",
                checkPoints: checkPointsArray
            }

            console.log("\n\nSchedules for the skateprofile the event is created for:\n\n" + JSON.stringify(currentSkateProfile.schedules));

            const newAggresiveSkatingEvent: AggresiveEvent = {
                id: eventId,
                name: eventName,
                note: description,
                maxParticipants: numberOfPartners,
                imageUrl: eventImage,
                description: description,
                days: selectedDays,
                gender: gender,
                maximumAge: maximumAge,
                minimumAge: minimumAge,
                skateExperience: SkateExperience.Advanced, //TODO selected by user
                outing: {
                    id: uuid.v4().toString(),
                    eventId: eventId,
                    startTime: startTime.getTime(),
                    endTime: endTime.getTime(),
                    skatePracticeStyle: SkatePracticeStyles.AggresiveSkating,
                    trail: customTrail,
                    booked: true
                },
                skateProfiles: 
                [
                    {
                        ...currentSkateProfile,
                        schedules: undefined
                    }
                ]
            }
            console.log("Adding event:\n" + JSON.stringify(newAggresiveSkatingEvent));
            //dispatch(addAggresiveEventToUser(newAggresiveSkatingEvent));
            if(JWTTokenResult !== undefined && !validation.isJWTTokenExpired(JWTTokenResult))
            {
                Fetch.postAggresiveSkatingEvent(JWTTokenResult.token,
                    newAggresiveSkatingEvent,
                () => console.log("POSTED NEW AGGRESIVE EVEVNT SUCCESSFULLY"), 
                () => console.log("POSTED NEW AGGRESIVE EVEVNT UNSUCCESSFULLY"))
            }
            else{
                //TODO refresh token
            }
           
            //if event posted succesfully 
            navigation.navigate("Events" as never);
        }
    }

    const canCreateEvent = () : boolean => {
        if(checkPointsArray === undefined || checkPointsArray === null || checkPointsArray.length < 2)
            return false;
        if(selectedDays === undefined || selectedDays === null || selectedDays.length === 0)
            return false;
        if(minimumAge === undefined || minimumAge === null)
            return false;
        if(maximumAge === undefined || maximumAge === null)
            return false;
        if(numberOfPartners === undefined || numberOfPartners === null)
            return false;
        if(gender === undefined)
            return false;

        return true;
    }

    const addCheckPoint = () => {
        if(selectedLocation !== undefined && checkPointsArray !== undefined )
        {
            let customTrailId;
            if(checkPointsArray.length === 0)
            {
                customTrailId = uuid.v4().toString();
            }
            else
            {
                customTrailId = checkPointsArray[0]?.customTrailId;
            }
            const newCheckPoint: CheckPoint = {
                id: uuid.v4().toString(),
                order: checkPointsArray.length,
                customTrailId:  customTrailId, //TODO to be fixed later on
                location: selectedLocation
            }
            setCheckPointsArray((currentArray) => [...currentArray, newCheckPoint])
        }
    }

    const showAddMarkerButton = (nativeEvent) => {
        const {coordinate} = nativeEvent;
        if(mapRef !== null && mapRef.current !== null)
        {
            mapRef.current.pointForCoordinate(coordinate)
            .then(pointOnScreen => setMarkerPopOverPosition({x: pointOnScreen.x, y: pointOnScreen.y + scale(70)}))
            setMarkerPopOverVisible(true);
        }
       
        setSelectedLocation({
            id: uuid.v4().toString(),
            lat: coordinate.latitude,
            long: coordinate.longitude,
        })

        timoutId = setTimeout(() => {
            setMarkerPopOverVisible(false);
            setSelectedLocation(undefined);
        }, 1500);
    }


    const updateCheckpointCoordinates = (elementToUpdateIndex: number, changedCoordinates: LatLng) => {
        setCheckPointsArray(checkPointsArray.map((checkpoint, index) => {
            if(elementToUpdateIndex === index)
            {
                const newCheckPoint: CheckPoint = {
                    ...checkpoint,
                    location: {
                        ...checkpoint.location,
                        lat: changedCoordinates.latitude,
                        long: changedCoordinates. longitude
                    }
                };
                return newCheckPoint;
            }
            else return checkpoint;
        }))
    }   
      
    /** wraps to size of parent */
    const getMap = () => {
        return(
            <MapView ref={mapRef} style={{height: '100%', width: '100%', zIndex: 0}}
            initialRegion={{
                latitude: centeredLocation.lat,
                longitude: centeredLocation.long,
                latitudeDelta: 0.00001,
                longitudeDelta: mapsUtils.kMToLongitudes(2, centeredLocation.lat)
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
            //onPress={handleMapPress}
            onPress={({nativeEvent}) => showAddMarkerButton(nativeEvent)}
            provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
            >
                {mapsUtils.getCustomTrailMarkers(checkPointsArray, (index, changedCoordinated) => updateCheckpointCoordinates(index, changedCoordinated), 0)}
                {mapsUtils.drawRoute(checkPointsArray, checkPointsArray.length + 2)}
            </MapView>
        );

    }


    const getPopOver = () => {
        return(
            <Popover
            backgroundStyle={{ backgroundColor: 'transparent' }}
            from={new Rect(markerPopOverPosition.x + scale(15), markerPopOverPosition.y, 0, 0)}
            isVisible={markerPopOverVisible}
            >          
                <Button textColor='white' style={{backgroundColor: 'purple', borderRadius: 0}} text='Add marker'
                onPress={() => 
                {
                    addCheckPoint();
                    setSelectedLocation(undefined);
                    clearTimeout(timoutId);
                }} />
                {/* <ReactNativeButton title='Add marker'
                onPress={() => 
                {
                    addCheckPoint();
                    setSelectedLocation(undefined);
                    clearTimeout(timoutId);
                }} /> */}
            </Popover>
        )
    }

    const getHelpComponent = () => {
        return(
            <View>
                <Text>Press: Add Checkpoint</Text>
                <Text>Hold Checkpoint: Relocate Checkpoint</Text>
            </View>
        )
    }

    const getPictureContainer = () => {
        const height = verticalScale(200);
        const width = containersWidth;
        return(
            <View>
                {
                    eventImageLoading !== true ? 
                    (
                        <PrimaryContainer styleInput={{width: width}}>
                            <Text variant="labelLarge">Select a picture for your event:</Text>
                            <PrimaryContainer styleInput={{width: width, height: height}}>
                                <RectangularPicture onLoadingStatusChange={(status) => setEventImageLoading(status)} ratio={1.8} image={eventImage} onChange={(url) => setEventImage(url)}></RectangularPicture>
                            </PrimaryContainer>
                        </PrimaryContainer>
                    ):
                    (
                        <LoadingComponent width={width} height={height} ></LoadingComponent>
                    )
                }
            </View>
        )
       
    }

    const getMapContainer = () =>{
        return(
            <PrimaryContainer styleInput={styles.mapContainer}>
                <Text style={{flexWrap: 'nowrap'}} variant="headlineSmall">Create a trail for your event</Text>
                <Text>You can make a trail by adding checkpoint on the map. A checkpoint is a place you want the trail to go through</Text>
                <Pressable onPress={() => setFullScreenMap(true)}>
                    <View style={styles.map}>
                        {getMap()}
                    </View>
                </Pressable>
            </PrimaryContainer>
        )
    }

    const getCompanionPreferences = () => {
        return(
            <PrimaryContainer styleInput={{padding: scale(10)}}>
            <View style={{marginBottom: scale(25)}}>
                <Text variant="titleMedium" style={{padding: scale(5)}}>You would go out with maximum:</Text>
                <View style={[SpacingStyles.centeredContainer, {flexDirection: 'row'}]}>
                    <SelectNumberOfPeople inputValue={numberOfPartners !== undefined ?  numberOfPartners : null} onChange={nr => setNumberOfPartners(nr)}></SelectNumberOfPeople>
                    <Text style={{marginLeft: scale(10)}}>skaters</Text>
                </View>
            </View>
            <Text variant="titleMedium" style={{marginBottom: scale(7)}}>Event for skaters aged:</Text>
            <SelectAgeGap minimumAge={minimumAge !== undefined ? minimumAge : null} 
            maximumAge={maximumAge !== undefined ? maximumAge : null} onMinimumAgeChange={(age) => setMinimumAge(age)}
                            onMaximumAgeChange={(age) => setMaximumAge(age)}/>
            <SelectGender gender={gender} onGenderChange={(value) => setGender(value)}></SelectGender>
            </PrimaryContainer>
        )
    }
    const getEverythingElse = () =>{
        return(
            <View style={{flex: 1, width: containersWidth, height: verticalScale(700)}}>
                <View style={[SpacingStyles.centeredContainer, {flex: 0.5}]}>
                    <SelectDays selectedDays={selectedDays} onSelectedDaysChange={(selDays) => setSelectedDays(selDays)}></SelectDays>
                </View>
                <View style={[SpacingStyles.centeredContainer, {flex: 0.5}]}>
                    <SelectHourRange
                    startTime={startTime} 
                    onStartTimeChange={(value) => setStartTime(value)}
                    endTime={endTime} 
                    onEndTimeChange={(value) => setEndTime(value)}
                    ></SelectHourRange>
                </View>
                <View style={[SpacingStyles.centeredContainer, {flex: 1.1}]}>
                    {getCompanionPreferences()}
                </View>
            </View>
        )
    }

    const getDetails = () => {
        return(
        <PrimaryContainer styleInput={{backgroundColor: theme.colors.background, padding: scale(5), margin: scale(20)}}>
            <Text style={{margin: scale(5)}}>Name of your event:</Text>
            <TextInput
            style={[styles.nameInput, {backgroundColor: theme.colors.primary}]}
            label="Event Name"
            selectionColor={theme.colors.tertiary}
            value={eventName}
            onChangeText={setEventName}
            />

            <Text style={{margin: scale(5)}}>Give a short description of your event</Text>
            <TextInput
            style={[styles.descriptionInput, {backgroundColor: theme.colors.primary}]}
            multiline={true}
            selectionColor={theme.colors.tertiary}
            label="Event description"
            value={description}
            numberOfLines={7}
            onChangeText={setDescription}
            />
        </PrimaryContainer>
        )
    }
    const getBody = () => {
        return(
            <View style={[StyleSheet.absoluteFill, SpacingStyles.centeredContainer]}>
            {
                fullScreenMap === true ? 
                (
                    <PrimaryContainer styleInput={{width: '100%', height: '100%'}}>
                        <PrimaryContainer styleInput={styles.helpComponent}>
                            {getHelpComponent()}
                        </PrimaryContainer>
                       {markerPopOverVisible === true && getPopOver()}
                        {getMap()}
                    </PrimaryContainer>
                ):(
                    <ScrollView style={StyleSheet.absoluteFill} contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
                    {getDetails()}
                    {getMapContainer()}
                    {getPictureContainer()}
                    {getEverythingElse()}
                    </ScrollView>
                )
            }
            </View>
        )
    }

    const onBackFunction = () => {
        if(fullScreenMap === true)
        {
            setFullScreenMap(false);
        }
        else navigation.goBack();
    }
    return(
        <Layout2Piece
            header={
                fullScreenMap === false ? 
                (
                    <GeneralHeader rightButtonEnable={canCreateEvent()}
                    onBack={() => onBackFunction()} onRightButtonPress={() => createEvent()} rightButtonText={"Create Event"}/>
                ):(
                    <GeneralHeader rightButtonEnable={true}
                    onBack={() => onBackFunction()} onRightButtonPress={() => setFullScreenMap(false)} rightButtonText={"Continue"}/>
                )
           
            }
            body={getBody()}
        ></Layout2Piece>
    );
}

export default CreateEvent;

const styles = StyleSheet.create({
    map: {
        marginTop: scale(20),
        width: containersWidth - scale(30),
        height: scale(250)
    },
    mapContainer: {
        margin: scale(20),
        width: containersWidth,
        padding: scale(10)
    },
    helpComponent: {
        zIndex: 1,
        position: "absolute",
        top: scale(50)
    },
    eventImageText: {
        marginTop: verticalScale(30)
    },
    descriptionInput: {
        width: scale(250),
        maxHeight: verticalScale(100),
        margin: verticalScale(20),
    },
    nameInput: {
      width: scale(250),
      margin: verticalScale(20),
    }
})
