import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Platform } from "react-native";

import { scale, verticalScale } from "react-native-size-matters";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Text, useTheme } from "react-native-paper";
import * as ExpoLocation from "expo-location";
import uuid from "react-native-uuid";
import WheelPickerExpo from "react-native-wheel-picker-expo";
import { useDispatch, useSelector } from "react-redux";
import { useTourGuideController } from "rn-tourguide";

import { LocationSvg } from "../svg/general";
import { Location, Zone } from "../../types";
import { PrimaryContainer, SvgView } from "../general";
import { mapsUtils } from "../../utils";
import LoadingComponent from "../general/LoadingComponent";
import { setZone } from "../../redux/createScheduleState";
import { RootState } from "../../redux/store";

interface Distance {
  label: string;
  value: number;
}

interface Input {
  onTouchInside?: Function;
  onTouchOutside?: Function;
  zone: Zone | undefined;
}

const SelectLocationAggresive = ({
  onTouchInside,
  onTouchOutside,
  zone,
}: Input) => {
  const { allParkTrails } = useSelector((state: RootState) => state.appState);
  const { currentSkateProfile } = useSelector(
    (state: RootState) => state.globalState
  );
  const [range, setRange] = useState<number>(
    zone !== undefined ? zone.range : 1
  );
  const [selectedLocation, setSelectedLocation] = useState<
    Location | undefined
  >({
    id: uuid.v4().toString(),
    name: zone !== undefined ? zone.location.name : "Cluj-Napoca",
    lat: zone !== undefined ? zone.location.lat : 46.77096,
    long: zone !== undefined ? zone.location.long : 23.596937,
  });
  const dispatch = useDispatch();
  const theme = useTheme();
  const mapRef = useRef<MapView | null>(null);
  const rangeArray: Distance[] = [
    { label: "+0.2", value: 0.2 },
    { label: "+0.5", value: 0.5 },
    { label: "+0.8", value: 0.8 },
    { label: "+1", value: 1 },
    { label: "+1.5", value: 1.5 },
    { label: "+2", value: 2 },
    { label: "+3", value: 3 },
    { label: "+4", value: 4 },
    { label: "+5", value: 5 },
    { label: "+10", value: 10 },
    { label: "+15", value: 15 },
  ];

  //////FOR WALKTHROUGH////
  const {
    canStart, // a boolean indicate if you can start tour guide
    start, // a function to start the tourguide
    TourGuideZone,
  } = useTourGuideController("scheduleAggresive");

  useEffect(() => {
    if (canStart) {
      start();
    }
  }, [canStart]);
  ////

  /* Gets and sets device location */
  useEffect(() => {
    (async () => {
      const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const location = await ExpoLocation.getCurrentPositionAsync({});

      if (zone === undefined) {
        if (mapRef.current != null) {
          mapRef.current.animateToRegion(
            {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.00001,
              longitudeDelta: mapsUtils.kMToLongitudes(
                range,
                location.coords.latitude
              ),
            },
            1000
          );
        }

        setSelectedLocation({
          id: uuid.v4().toString(),
          name: "Your Location",
          lat: location.coords.latitude,
          long: location.coords.longitude,
        });
      }
    })();
  }, []);

  useEffect(() => {
    if (selectedLocation !== undefined) {
      mapsUtils.zoomMapInAndOut(mapRef, selectedLocation, range);
    }

    updateZone();
  }, [range, selectedLocation]);

  const updateZone = () => {
    if (
      selectedLocation !== undefined &&
      range !== undefined &&
      currentSkateProfile !== undefined
    ) {
      const zone: Zone = {
        id: uuid.v4().toString(),
        range: range,
        locationId: selectedLocation.id,
        location: selectedLocation,
        scheduleId: currentSkateProfile.id,
      };
      dispatch(setZone(zone));
    }
  };

  const renderWheelPickerItem = itemToRender => {
    return <Text style={{ alignSelf: "center" }}>{itemToRender.label}</Text>;
  };

  return (
    <View>
      <PrimaryContainer
        styleInput={{ padding: scale(10), marginVertical: scale(10) }}
      >
        <View
          onTouchStart={() => onTouchInside && onTouchInside()}
          style={{ flexDirection: "row", paddingBottom: verticalScale(5) }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SvgView
              size="small"
              style={{
                backgroundColor: theme.colors.tertiary,
                borderRadius: 10,
              }}
            >
              <LocationSvg></LocationSvg>
            </SvgView>
            <Text variant="bodyLarge">Location</Text>
          </View>

          <View style={styles.picker}>
            <WheelPickerExpo
              height={verticalScale(100)}
              width={scale(40)}
              initialSelectedIndex={0}
              items={rangeArray.map(range => ({
                label: range.label,
                value: range.value,
              }))}
              onChange={range => {
                onTouchOutside && onTouchOutside();
                setRange(range.item.value);
              }}
              selectedStyle={{
                borderColor: theme.colors.tertiary,
                borderWidth: 1,
              }}
              renderItem={itemToRender => renderWheelPickerItem(itemToRender)}
              haptics={false}
            />
            <Text>km</Text>
          </View>
        </View>

        {selectedLocation !== undefined ? (
          <TourGuideZone
            zone={2}
            text={"You can hold on maps to select a new location"}
            borderRadius={16}
          >
            <MapView
              ref={mapRef}
              style={styles.mapFraction}
              initialRegion={{
                latitude: selectedLocation.lat,
                longitude: selectedLocation.long,
                latitudeDelta: 0.00001,
                longitudeDelta: mapsUtils.kMToLongitudes(
                  range,
                  selectedLocation.lat
                ),
              }}
              onLongPress={({ nativeEvent }) =>
                setSelectedLocation(prevLocation => {
                  const { coordinate } = nativeEvent;
                  const newLocation: Location = {
                    ...prevLocation,
                    id: uuid.v4().toString(),
                    lat: coordinate.latitude,
                    long: coordinate.longitude,
                  };
                  return newLocation;
                })
              }
              provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
            >
              {mapsUtils.getMarker(selectedLocation, selectedLocation.name, 0)}
              {mapsUtils.getCircle(selectedLocation, range, 1)}
              {allParkTrails !== undefined &&
                mapsUtils.getParkTrailMarkers(allParkTrails, 3)}
            </MapView>
          </TourGuideZone>
        ) : (
          <LoadingComponent
            width={styles.mapFraction.width}
            height={styles.mapFraction.height}
          ></LoadingComponent>
        )}
      </PrimaryContainer>
    </View>
  );
};

export default SelectLocationAggresive;

const styles = StyleSheet.create({
  picker: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: scale(10),
  },
  mapFraction: {
    width: scale(300),
    height: verticalScale(200),
  },
});
