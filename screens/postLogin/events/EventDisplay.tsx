import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";

import { Text, useTheme } from "react-native-paper";
import { scale, verticalScale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-native-uuid";

import { EventImage, GenderDisplay } from "../../../components/eventDisplay";
import { GeneralHeader, SvgView } from "../../../components/general";
import SkateProfilesList from "../../../components/general/SkateProfilesList";
import { LevelSvg } from "../../../components/svg/general";
import { RootState } from "../../../redux/store";
import { Fetch } from "../../../services";
import { SpacingStyles } from "../../../styles";
import { Event, SkateProfile } from "../../../types";
import { filterUtils, uiUtils, validation } from "../../../utils";
import { Layout2Piece } from "../../layouts";
import eventUtils from "../../../utils/EventUtil";
import {
  setNeedsEventsRefresh,
  setNeedsRecommendedEventsRefresh,
} from "../../../redux/appState";
import { LoadingScreen } from "../../preLogin";

const EventDisplay = ({ route, navigation }) => {
  const event: Event = route.params.event;
  const joined: boolean = route.params.joined;

  const theme = useTheme();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const { JWTTokenResult } = useSelector((state: RootState) => state.appState);
  const { currentSkateProfile } = useSelector(
    (state: RootState) => state.globalState
  );
  const [suggestedSkateProfiles, setSuggestedSkateProfiles] = useState<
    Array<SkateProfile> | undefined
  >(undefined);
  const [attendingSkateProfiles, setAttendingSkateProfiles] = useState<
    Array<SkateProfile> | undefined
  >(undefined);

  useEffect(() => {
    if (currentSkateProfile !== undefined) {
      if (
        JWTTokenResult !== undefined &&
        !validation.isJWTTokenExpired(JWTTokenResult)
      ) {
        Fetch.getSkateProfilesForEvent(
          JWTTokenResult.token,
          event.id,
          skateProf =>
            setAttendingSkateProfiles(
              filterUtils.excludeSkateProfile(skateProf, currentSkateProfile)
            ),
          () => console.log("Coudn't get attending skate profiles")
        );
        Fetch.getSuggestedSkateProfilesForEvent(
          JWTTokenResult.token,
          event.id,
          skateProf =>
            setSuggestedSkateProfiles(
              filterUtils.excludeSkateProfile(skateProf, currentSkateProfile)
            ),
          () => console.log("Coudn't get suggested skate profiles")
        );
      } else {
        //TODO refresh token
      }
    }
  }, []);

  const getEventOrganisationalData = () => {
    return (
      <View
        style={{
          borderRadius: 20,
          borderWidth: 3,
          borderColor: "white",
          width: "80%",
          paddingVertical: scale(10),
          marginVertical: scale(20),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            marginBottom: scale(2),
            fontWeight: "bold",
            fontSize: 17,
            color: theme.colors.tertiary,
          }}
        >
          Event info:{" "}
        </Text>

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
    );
  };

  const skatersInfo = () => {
    return (
      <View style={SpacingStyles.centeredContainer}>
        <View
          style={{ margin: 10, justifyContent: "center", alignItems: "center" }}
        >
          <Text variant="headlineSmall" style={{ marginBottom: scale(2) }}>
            Event's skaters
          </Text>
          <GenderDisplay gender={event.gender}></GenderDisplay>
          <Text variant="labelMedium">
            Skaters with opacity are just suggested
          </Text>
          <Text variant="labelMedium">
            Skater who are opaque are participating
          </Text>
        </View>
        {suggestedSkateProfiles !== undefined &&
          suggestedSkateProfiles !== null &&
          attendingSkateProfiles !== undefined &&
          attendingSkateProfiles !== null && (
            <SkateProfilesList
              suggestedSkateProfiles={suggestedSkateProfiles}
              attendingSkateProfiles={attendingSkateProfiles}
            ></SkateProfilesList>
          )}
        {getEventOrganisationalData()}
      </View>
    );
  };

  const getBody = () => {
    return (
      <ScrollView>
        {loading === false ? (
          <View>
            <EventImage event={event}></EventImage>
            {skatersInfo()}
          </View>
        ) : (
          <LoadingScreen></LoadingScreen>
        )}
      </ScrollView>
    );
  };

  function joinEvent() {
    eventUtils.joinEvent(
      currentSkateProfile,
      JWTTokenResult,
      event.id,
      () => {
        console.log("\n\nEvent joined SUCCESSFULLY");
        setNeedsEventsRefresh(true);
        dispatch(setNeedsRecommendedEventsRefresh(true));
        setLoading(false);
        navigation.goBack();
      },
      () => console.log("\n\nEvent join FAILED")
    );
  }

  function leaveEvent() {
    eventUtils.leaveEvent(
      currentSkateProfile,
      JWTTokenResult,
      event.id,
      () => {
        console.log("\n\nEvent left SUCCESSFULLY");
        dispatch(setNeedsEventsRefresh(true));
        dispatch(setNeedsRecommendedEventsRefresh(true));
        setLoading(false);
        navigation.goBack();
      },
      () => console.log("\n\nEvent left FAILED")
    );
  }

  function deleteEvent() {
    eventUtils.deleteEvent(
      JWTTokenResult,
      event.id,
      () => {
        console.log("\n\nEvent deleted SUCCESSFULLY");
        dispatch(setNeedsEventsRefresh(true));
        dispatch(setNeedsRecommendedEventsRefresh(true));
        setLoading(false);
        navigation.goBack();
      },
      () => console.log("\n\nEvent delete FAILED")
    );
  }

  const eventOwner = eventUtils.isOwnerOfEvent(event, currentSkateProfile);

  const rightButtonFunction = () => {
    setLoading(true);
    if (joined === false) {
      return joinEvent();
    } else {
      if (eventOwner === true) {
        return deleteEvent();
      } else {
        return leaveEvent();
      }
    }
  };

  const getRightButtonText = () => {
    if (joined === false) {
      return "Join";
    } else {
      if (eventOwner === true) {
        return "Delete";
      } else {
        return "Leave";
      }
    }
  };

  return (
    <Layout2Piece
      header={
        <GeneralHeader
          onBack={() => {
            navigation.navigate(route.params.previousScreen);
          }}
          title={event.name}
          rightButtonEnable={true}
          onRightButtonPress={() => rightButtonFunction()}
          rightButtonText={getRightButtonText()}
        ></GeneralHeader>
      }
      body={getBody()}
    ></Layout2Piece>
  );
};

export default EventDisplay;

const styles = StyleSheet.create({
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
  image: {
    width: "100%",
    height: verticalScale(300),
    backgroundColor: "black",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
});
