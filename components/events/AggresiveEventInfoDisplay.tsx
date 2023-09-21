import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";

import uuid from "react-native-uuid";
import { nothing } from "immer";
import { Text, useTheme } from "react-native-paper";
import { scale, verticalScale } from "react-native-size-matters";

import { SpacingStyles } from "../../styles";
import { CustomTrail, Event, Location } from "../../types";
import { mapsUtils, uiUtils } from "../../utils";
import SvgView from "../general/SvgView";
import { LevelSvg } from "../svg/general";

interface EventInput {
  event: Event;
}

const AggresiveEventInfoDisplay = ({ event }: EventInput) => {
  const customTrail: CustomTrail = event.outing.trail as CustomTrail;

  const theme = useTheme();
  const mapRef = useRef<MapView | null>(null);
  const centeredLocation: Location = {
    id: uuid.v4().toString(),
    name: "Cluj-Napoca",
    lat: 46.77096,
    long: 23.596937,
  };

  return (
    <View style={[styles.descriptionView, SpacingStyles.centeredContainer]}>
      <View style={{ width: "90%", height: 200 }}>
        {mapsUtils.getUneditableCustomTrailMap(
          mapRef,
          centeredLocation,
          customTrail.checkPoints,
          () => nothing,
          0
        )}
      </View>

      <View style={{ width: "60%", height: 160 }}>
        <View
          style={[
            styles.rowContainer,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <SvgView size="small">
            <LevelSvg></LevelSvg>
          </SvgView>
          <Text
            style={[styles.descriptionText, { color: theme.colors.tertiary }]}
          >
            {event.skateExperience}
          </Text>
        </View>

        <View
          style={[
            styles.rowContainer,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <Text style={[styles.descriptionText]}>
            {uiUtils.getTimeRange(event.outing.startTime, event.outing.endTime)}
          </Text>
        </View>

        <View
          style={[
            styles.rowContainer,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <Text style={[styles.descriptionText]}>Days: </Text>
          {event.outing.days.map((dayObject, index) => {
            return (
              <View key={uuid.v4().toString()} style={{ flexDirection: "row" }}>
                {index !== 0 && (
                  <Text
                    key={uuid.v4().toString()}
                    style={[styles.descriptionText]}
                  >
                    ,{" "}
                  </Text>
                )}
                <Text
                  key={uuid.v4().toString()}
                  style={[styles.descriptionText]}
                >
                  {dayObject.dayOfMonth}
                </Text>
              </View>
            );
          })}
        </View>

        <View
          style={[
            styles.rowContainer,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <Text style={[styles.descriptionText]}>
            Age range: {event.minimumAge} - {event.maximumAge}
          </Text>
        </View>

        <View
          style={[
            styles.rowContainer,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <Text style={[styles.descriptionText]}>Gender: {event.gender}</Text>
        </View>
      </View>
    </View>
  );
};

export default AggresiveEventInfoDisplay;

const styles = StyleSheet.create({
  descriptionView: {
    width: "100%",
    margin: "3%",
  },
  descriptionText: {
    fontSize: verticalScale(10) < 10 ? 10 : verticalScale(10),
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    margin: scale(4),
    paddingHorizontal: scale(7),
  },
  mapContainer: {
    margin: scale(20),
    width: 100,
    padding: scale(10),
  },
});
