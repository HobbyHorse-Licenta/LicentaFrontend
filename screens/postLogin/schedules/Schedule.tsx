import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

import { scale } from "react-native-size-matters";
import uuid from "react-native-uuid";
import { useTourGuideController } from "rn-tourguide";
import { useDispatch, useSelector } from "react-redux";

import { SpacingStyles } from "../../../styles";
import {
  SelectDays,
  SelectLocationAggresive,
  SelectLocationCasualAndSpeed,
  SelectHourRange,
  SelectCompanion,
} from "../../../components/schedule";
import { Layout2Piece } from "../../layouts";
import {
  Gender,
  Schedule as ScheduleType,
  SkatePracticeStyles,
  Zone,
} from "../../../types";
import { GeneralHeader } from "../../../components/general";
import { RootState } from "../../../redux/store";
import { uiUtils, validation } from "../../../utils";
import { Fetch } from "../../../services";
import {
  addSchedule,
  backupUser,
  revertChangesInUser,
  updateSchedule,
} from "../../../redux/appState";
import { resetCreateScheduleState } from "../../../redux/createScheduleState";
import { Day } from "../../../types";
import { setScheduleWalkthrough } from "../../../redux/walkthroughState";

const Schedule = ({ route, navigation }) => {
  let updateMode = false;
  let scheduleToUpdate: ScheduleType | undefined = undefined;
  if (route.params !== undefined) {
    updateMode = route.params.updateMode;
    scheduleToUpdate = route.params.scheduleToUpdate;
  }

  const scheduleConfig = useSelector(
    (state: RootState) => state.createScheduleState
  );

  const { JWTTokenResult } = useSelector((state: RootState) => state.appState);
  const { currentSkateProfile } = useSelector(
    (state: RootState) => state.globalState
  );
  const { schedule } = useSelector(
    (state: RootState) => state.walkthroughState
  );

  const dispatch = useDispatch();

  const [skipWalkthroughPromptVisibility, setSkipWalkthroughPromptVisibility] =
    useState<boolean>(false);
  const [parkSelected, setParkSelected] = useState(false);
  const [scrollEnable, setScrollEnable] = useState(true);
  const [canCreateSchedule, setCanCreateSchedule] = useState(false);
  const [selectedDays, setSelectedDays] = useState<Array<Day>>(
    scheduleConfig.selectedDays !== undefined ? scheduleConfig.selectedDays : []
  );
  const [startTime, setStarTTime] = useState<Date>(
    scheduleConfig.startTime !== undefined
      ? new Date(scheduleConfig.startTime)
      : new Date()
  );
  const [endTime, setEnDTime] = useState<Date>(
    scheduleConfig.endTime !== undefined
      ? new Date(scheduleConfig.endTime)
      : new Date()
  );

  const zone: Zone | undefined = scheduleConfig.zone;

  const [selectedGender, setSelectedGender] = useState<Gender | undefined>(
    scheduleConfig.gender
  );
  const [numberOfPartners, setNumberOfPartners] = useState<number | undefined>(
    scheduleConfig.maxNumberOfPeople
  );
  const [minimumAge, setMinimumAgee] = useState<number | undefined>(
    scheduleConfig.minimumAge
  );
  const [maximumAge, setMaximumAgee] = useState<number | undefined>(
    scheduleConfig.maximumAge
  );

  const {
    canStart, // a boolean indicate if you can start tour guide
    start, // a function to start the tourguide
    eventEmitter, // an object for listening some events
  } = useTourGuideController("schedule");

  useEffect(() => {
    if (canStart && schedule === true) {
      start();
    }
    if (eventEmitter !== undefined) {
      eventEmitter.on("stop", () => setSkipWalkthroughPromptVisibility(true));
    }

    return () => {
      if (eventEmitter !== undefined) {
        eventEmitter.off("stop", () =>
          setSkipWalkthroughPromptVisibility(true)
        );
      }
    };
  }, [canStart]);

  //checks if all fields are completed so the schedule can be created
  //(also sets if the button is disabled or not)
  useEffect(() => {
    if (!validation.isDefined(selectedDays)) {
      setCanCreateSchedule(false);
      return;
    }
    if (!validation.isDefined(startTime) || !validation.isDefined(endTime)) {
      setCanCreateSchedule(false);
      return;
    }
    if (!validation.isDefined(zone) || !validation.isDefined(zone?.location)) {
      setCanCreateSchedule(false);
      return;
    }
    if (
      !validation.isDefined(minimumAge) ||
      !validation.isDefined(maximumAge)
    ) {
      setCanCreateSchedule(false);
      return;
    }
    if (!validation.isDefined(selectedGender)) {
      setCanCreateSchedule(false);
      return;
    }
    if (!validation.isDefined(numberOfPartners)) {
      setCanCreateSchedule(false);
      return;
    }
    if (
      currentSkateProfile !== undefined &&
      (currentSkateProfile.skatePracticeStyle ===
        SkatePracticeStyles.CasualSkating ||
        currentSkateProfile.skatePracticeStyle ===
          SkatePracticeStyles.SpeedSkating)
    ) {
      if (parkSelected === false) {
        setCanCreateSchedule(false);
        return;
      }
    }
    setCanCreateSchedule(true);
  }, [
    selectedDays,
    startTime,
    endTime,
    zone,
    minimumAge,
    maximumAge,
    selectedGender,
    numberOfPartners,
    parkSelected,
  ]);

  // useEffect(() => {
  //   dispatch(setSelectedDaysState(selectedDays));
  // }, [selectedDays])

  // useEffect(() => {
  //   dispatch(setStartTime(startTime.getTime()));
  //   dispatch(setEndTime(endTime.getTime()));
  // }, [startTime, endTime])

  const createNewSchedule = () => {
    if (currentSkateProfile !== undefined && currentSkateProfile !== null) {
      if (
        endTime !== undefined &&
        startTime !== undefined &&
        zone !== undefined &&
        minimumAge !== undefined &&
        maximumAge !== undefined &&
        selectedGender !== undefined &&
        numberOfPartners !== undefined &&
        selectedDays !== undefined
      ) {
        const newSchedule: ScheduleType = {
          id: uuid.v4().toString(),
          skateProfileId: currentSkateProfile.id,
          days: selectedDays,
          startTime: startTime.getTime(),
          endTime: endTime.getTime(),
          zones: [zone],
          minimumAge: minimumAge,
          maximumAge: maximumAge,
          gender: selectedGender,
          maxNumberOfPeople: numberOfPartners,
        };

        dispatch(backupUser());

        //optimistic update
        dispatch(addSchedule(newSchedule));
        navigation.navigate("MySchedules" as never);

        if (
          JWTTokenResult !== undefined &&
          !validation.isJWTTokenExpired(JWTTokenResult)
        ) {
          Fetch.postSchedule(
            JWTTokenResult.token,
            newSchedule,
            () => {
              console.log("Schedule post success");
            },
            () => {
              console.log("Schedule post fail; rever changes");
              uiUtils.showPopUp("Error", "Coudn't create schedule");
              dispatch(revertChangesInUser());
            }
          );
        } else {
          //TODO refresh token
        }
      }

      dispatch(resetCreateScheduleState());
    } else {
      uiUtils.showPopUp("Error", "No skateProfile selected");
    }
  };

  const updateExistingSchedule = () => {
    if (currentSkateProfile !== undefined && currentSkateProfile !== null) {
      if (
        scheduleToUpdate !== undefined &&
        endTime !== undefined &&
        startTime !== undefined &&
        zone !== undefined &&
        minimumAge !== undefined &&
        maximumAge !== undefined &&
        selectedGender !== undefined &&
        numberOfPartners !== undefined &&
        selectedDays !== undefined
      ) {
        const newSchedule: ScheduleType = {
          ...scheduleToUpdate,
          days: selectedDays,
          startTime: startTime.getTime(),
          endTime: endTime.getTime(),
          zones: [zone],
          minimumAge: minimumAge,
          maximumAge: maximumAge,
          gender: selectedGender,
          maxNumberOfPeople: numberOfPartners,
        };
        dispatch(backupUser());

        //optimistic update
        dispatch(updateSchedule(newSchedule));
        navigation.navigate("MySchedules" as never);

        dispatch(resetCreateScheduleState());

        if (
          JWTTokenResult !== undefined &&
          !validation.isJWTTokenExpired(JWTTokenResult)
        ) {
          Fetch.putSchedule(
            JWTTokenResult.token,
            scheduleToUpdate.id,
            newSchedule,
            dbSchedule => {
              console.log("Schedule put success");
              dispatch(updateSchedule(dbSchedule));
            },
            () => {
              console.log("Schedule put fail; revert changes");
              uiUtils.showPopUp("Error", "Coudn't update schedule");
              dispatch(revertChangesInUser());
            }
          );
        } else {
          //TODO refresh token
        }
      }
    } else {
      uiUtils.showPopUp("Error", "No skateProfile selected");
    }
  };

  const getcreateScheduleContainer = () => {
    return (
      <ScrollView
        scrollEnabled={scrollEnable}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={[SpacingStyles.centeredContainer, { flex: 0.8 }]}>
          <SelectDays
            selectedDays={selectedDays}
            onSelectedDaysChange={setSelectedDays}
          ></SelectDays>
        </View>
        <View style={[SpacingStyles.centeredContainer, { flex: 0.9 }]}>
          <SelectHourRange
            startTime={startTime}
            onStartTimeChange={value => setStarTTime(value)}
            endTime={endTime}
            onEndTimeChange={value => setEnDTime(value)}
          ></SelectHourRange>
        </View>
        {currentSkateProfile?.skatePracticeStyle ===
          SkatePracticeStyles.AggresiveSkating && (
          <View style={[SpacingStyles.centeredContainer, { flex: 3 }]}>
            <SelectLocationAggresive
              onTouchInside={() => {
                setScrollEnable(false);
              }}
              zone={zone}
              onTouchOutside={() => {
                setScrollEnable(true);
              }}
            ></SelectLocationAggresive>
          </View>
        )}
        {currentSkateProfile !== undefined &&
          (currentSkateProfile.skatePracticeStyle ===
            SkatePracticeStyles.CasualSkating ||
            currentSkateProfile.skatePracticeStyle ===
              SkatePracticeStyles.SpeedSkating) && (
            <View style={[SpacingStyles.centeredContainer, { flex: 3 }]}>
              <SelectLocationCasualAndSpeed
                parkSelected={parkSelected}
                zone={zone}
                setParkSelected={setParkSelected}
                onTouchInside={() => {
                  setScrollEnable(false);
                }}
                onTouchOutside={() => {
                  setScrollEnable(true);
                }}
              ></SelectLocationCasualAndSpeed>
            </View>
          )}

        <View style={[SpacingStyles.centeredContainer, { flex: 3 }]}>
          <SelectCompanion
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
            numberOfPartners={numberOfPartners}
            setNumberOfPartners={setNumberOfPartners}
            minimumAge={minimumAge}
            setMinimumAgee={setMinimumAgee}
            maximumAge={maximumAge}
            setMaximumAgee={setMaximumAgee}
          ></SelectCompanion>
        </View>
      </ScrollView>
    );
  };

  const getBody = () => {
    return (
      <View
        style={[
          SpacingStyles.centeredContainer,
          SpacingStyles.fullSizeContainer,
          { padding: scale(14) },
        ]}
      >
        {getcreateScheduleContainer()}
        {uiUtils.getShowWalkthroughModal(
          skipWalkthroughPromptVisibility,
          visibility => setSkipWalkthroughPromptVisibility(visibility),
          () => {
            dispatch(setScheduleWalkthrough(false));
          }
        )}
      </View>
    );
  };

  const createOrUpdateSchedule = () => {
    if (updateMode !== undefined && updateMode === true) {
      updateExistingSchedule();
    } else {
      createNewSchedule();
    }
  };
  return (
    <Layout2Piece
      header={
        <GeneralHeader
          rightButtonEnable={canCreateSchedule}
          onBack={() => navigation.goBack()}
          onRightButtonPress={() => createOrUpdateSchedule()}
          rightButtonText={
            updateMode === true ? "Update Schedule" : "Add Schedule"
          }
        />
      }
      body={getBody()}
    ></Layout2Piece>
  );
};

export default Schedule;
