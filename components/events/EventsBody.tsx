import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Pressable } from "react-native";

import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useTourGuideController } from "rn-tourguide";
import uuid from "react-native-uuid";

import { SpacingStyles } from "../../styles";
import {
  AggresiveEventCard,
  EventCard,
  InformationalSvgComponent,
  LoadingComponent,
  PrimaryContainer,
  SvgView,
} from "../general";
import { Event, SkatePracticeStyles } from "../../types";
import AddAggresiveSkatingEvent from "./AddAggresiveSkatingEvent";
import { SMILING_FACE_WITH_SUNGLASSES } from "../../assets/emotes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setEventsWalkthrough } from "../../redux/walkthroughState";
import { Fetch } from "../../services";
import {
  setAllParkTrails,
  setNeedsRecommendedEventsRefresh,
} from "../../redux/appState";
import SearchingSvg from "../svg/general/SearchingSvg";
import LeftArrowSvg from "../svg/general/LeftArrowSvg";
import RightArrowSvg from "../svg/general/RightArrowSvg";
import { uiUtils, validation } from "../../utils";
import { setCurrentSkateProfile } from "../../redux/globalState";

const EventsBody = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const { walkthroughState } = useSelector((state: RootState) => state);
  const { user, JWTTokenResult, needsRecommendedEventsRefresh } = useSelector(
    (state: RootState) => state.appState
  );
  const { currentSkateProfile } = useSelector(
    (state: RootState) => state.globalState
  );
  const [skipWalkthroughPromptVisibility, setSkipWalkthroughPromptVisibility] =
    useState(false);
  const [events, setEvents] = useState<Array<Event>>([]);

  useEffect(() => {
    getAndSetRecommendedEvents();
  }, [currentSkateProfile]);

  useEffect(() => {
    if (needsRecommendedEventsRefresh === true) {
      getAndSetRecommendedEvents();
      getAndSetRecommendedEvents();
      dispatch(setNeedsRecommendedEventsRefresh(false));
    }
  }, [needsRecommendedEventsRefresh]);

  useEffect(() => {
    if (
      JWTTokenResult !== undefined &&
      !validation.isJWTTokenExpired(JWTTokenResult)
    ) {
      Fetch.getAllParkTrails(
        JWTTokenResult.token,
        parkTrails => dispatch(setAllParkTrails(parkTrails)),
        () =>
          uiUtils.showPopUp(
            "Error",
            "Database is not working\nWe couldn't load the park trails"
          )
      );
    } else {
      //TODO refresh token
    }
  }, []);

  const { canStart, start, eventEmitter, TourGuideZone } =
    useTourGuideController("events");

  useEffect(() => {
    if (
      walkthroughState !== undefined &&
      walkthroughState.events !== undefined &&
      canStart &&
      walkthroughState.events === true
    ) {
      start();
    }
  }, [canStart, walkthroughState]);

  const showWalkthroughModal = () => {
    setSkipWalkthroughPromptVisibility(true);
  };

  useEffect(() => {
    if (eventEmitter !== undefined) {
      eventEmitter.on("stop", showWalkthroughModal);
    }

    return () => {
      if (eventEmitter !== undefined) {
        eventEmitter.off("stop", showWalkthroughModal);
      }
    };
  }, []);

  const getAndSetRecommendedEvents = () => {
    if (currentSkateProfile !== undefined) {
      setLoading(true);
      if (
        JWTTokenResult !== undefined &&
        !validation.isJWTTokenExpired(JWTTokenResult)
      ) {
        Fetch.getRecommendedEventsForSkateProfile(
          JWTTokenResult.token,
          currentSkateProfile.id,
          recommendedEvents => {
            /*console.log("GET; DATA RETURNED RECOMMENDED EVENTS\n " + JSON.stringify(recommendedEvents));*/ setEvents(
              recommendedEvents
            );
            setLoading(false);
          },
          () => {
            setEvents([]);
            setLoading(false);
            uiUtils.showPopUp(
              "Error",
              "Database is not working\nWe couldn't load recommended events"
            );
          }
        );
      } else {
        //TODO refresh token
      }
    } else {
      setLoading(false);
    }
  };

  const GoNextProfile = () => {
    setLoading(true);
    if (
      user !== undefined &&
      user.skateProfiles !== undefined &&
      currentSkateProfile !== undefined
    ) {
      const currentIndex = user.skateProfiles.findIndex(
        skateprofile => skateprofile.id === currentSkateProfile.id
      );
      dispatch(
        setCurrentSkateProfile(
          user.skateProfiles[(currentIndex + 1) % user.skateProfiles.length]
        )
      );
    }
  };

  const GoPreviousProfile = () => {
    setLoading(true);
    if (
      user !== undefined &&
      user.skateProfiles !== undefined &&
      currentSkateProfile !== undefined
    ) {
      const currentIndex = user.skateProfiles.findIndex(
        skateprofile => skateprofile.id === currentSkateProfile.id
      );
      if (currentIndex == 0) {
        dispatch(
          setCurrentSkateProfile(
            user.skateProfiles[user.skateProfiles.length - 1]
          )
        );
      } else {
        dispatch(
          setCurrentSkateProfile(
            user.skateProfiles[(currentIndex - 1) % user.skateProfiles.length]
          )
        );
      }
    }
  };

  const getTopPart = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <Pressable onPress={GoPreviousProfile}>
          <SvgView size="small">
            <LeftArrowSvg></LeftArrowSvg>
          </SvgView>
        </Pressable>
        <Text variant="headlineMedium">
          {currentSkateProfile?.skatePracticeStyle}
        </Text>
        <Pressable onPress={GoNextProfile}>
          <SvgView size="small">
            <RightArrowSvg></RightArrowSvg>
          </SvgView>
        </Pressable>
      </View>
    );
  };
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        SpacingStyles.centeredContainer,
        { padding: "5%", backgroundColor: "theme.colors.background" },
      ]}
    >
      {getTopPart()}
      <TourGuideZone
        zone={1}
        text={`You can add an event for skating on your city streets ${SMILING_FACE_WITH_SUNGLASSES}`}
      >
        <AddAggresiveSkatingEvent
          onPress={() => navigation.navigate("CreateEvent" as never)}
        ></AddAggresiveSkatingEvent>
      </TourGuideZone>
      {loading ? (
        <PrimaryContainer styleInput={SpacingStyles.eventCard}>
          <LoadingComponent
            height={SpacingStyles.eventCard.height}
            width={SpacingStyles.eventCard.width}
          ></LoadingComponent>
        </PrimaryContainer>
      ) : currentSkateProfile !== undefined &&
        events !== null &&
        events !== undefined &&
        events.length > 0 ? (
        <ScrollView style={{ width: "100%", margin: "0%" }}>
          {events.map(evnt => {
            if (
              currentSkateProfile.skatePracticeStyle ===
              SkatePracticeStyles.AggresiveSkating
            ) {
              return (
                <AggresiveEventCard
                  key={uuid.v4().toString()}
                  event={evnt}
                  joined={false}
                  onPress={() =>
                    navigation.navigate(
                      "AggresiveEventDisplay" as never,
                      { event: evnt, joined: false } as never
                    )
                  }
                ></AggresiveEventCard>
              );
            } else {
              return (
                <EventCard
                  key={uuid.v4().toString()}
                  event={evnt}
                  joined={false}
                  onPress={() =>
                    navigation.navigate(
                      "EventDisplay" as never,
                      {
                        event: evnt,
                        joined: false,
                        previousScreen: "Events",
                      } as never
                    )
                  }
                ></EventCard>
              );
            }
          })}
        </ScrollView>
      ) : (
        <InformationalSvgComponent
          headline="We are constantly looking for events for you"
          body="No skaters you'd like so far anyway"
          svgElement={<SearchingSvg></SearchingSvg>}
        />
      )}

      {uiUtils.getShowWalkthroughModal(
        skipWalkthroughPromptVisibility,
        visibility => setSkipWalkthroughPromptVisibility(visibility),
        () => dispatch(setEventsWalkthrough(false))
      )}
    </View>
  );
};

export default EventsBody;
