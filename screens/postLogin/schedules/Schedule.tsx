import React, { useEffect, useState } from "react";
import { ScrollView, View } from 'react-native';

import { scale } from "react-native-size-matters";
import uuid from 'react-native-uuid';

import { SpacingStyles } from '../../../styles';
import { AddSports, ScheduleHeader, SelectDays, SelectLocationAggresive, SelectLocationCasualAndSpeed, SelectHourRange, SelectCompanion} from '../../../components/schedule';
import { Layout2Piece } from '../../layouts';
import { Gender, Schedule as ScheduleType, SkatePracticeStyles, SportName } from "../../../types";
import { GeneralHeader, QuestionModal } from "../../../components/general";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { uiUtils, validation } from "../../../utils";
import { Fetch } from "../../../services";
import { addSchedule, backupUser, revertChangesInUser } from "../../../redux/appState";
import { setEndTime, setSelectedDaysState, setStartTime } from "../../../redux/createScheduleState";
import { Day } from "../../../types";
import { setScheduleWalkthrough } from "../../../redux/walkthroughState";
import { useTourGuideController } from "rn-tourguide";


const Schedule = () => {

  const scheduleConfig = useSelector((state: RootState) => state.createScheduleState);
  const {currentSkateProfile} = useSelector((state: RootState) => state.appState);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [skipWalkthroughPromptVisibility, setSkipWalkthroughPromptVisibility] = useState<boolean>(false);
  const [sportPickerVisible, setSportPickerVisible] =  useState<boolean>(false);
  const [selectedSports, setSelectedSports] = useState<Array<SportName>>([]);
  const [parkSelected, setParkSelected] = useState(false);
  const [scrollEnable, setScrollEnable] = useState(true);
  const [canCreateSchedule, setCanCreateSchedule] = useState(false);
  const [selectedDays, setSelectedDays] = useState<Array<Day>>([]);
  const [startTime, setStarTTime] = useState<Date>(new Date())
  const [endTime, setEnDTime] = useState<Date>(new Date())

  // const {
  //   canStart, // a boolean indicate if you can start tour guide
  //   start, // a function to start the tourguide
  //   stop, // a function  to stopping it
  //   eventEmitter, // an object for listening some events
  //   TourGuideZone
  // } = useTourGuideController('schedule')

  // useEffect(() => {
  //   console.log("SETTING UP EVENT EMITER");
  //   if(eventEmitter !== undefined)
  //   {

  //       eventEmitter.on('stop', () => setSkipWalkthroughPromptVisibility(true))
  //       console.log("SETTING UP IS DONE");
  //   }
  //   return () => {
  //     if(eventEmitter !== undefined)
  //     {
  //         eventEmitter.off('stop', () => setSkipWalkthroughPromptVisibility(true))
  //     }
  //   }
  // }, [])

  //checks if all fields are completed so the schedule can be created
  //(also sets if the button is disabled or not)
  useEffect(() => {
    
    if(!validation.isDefined(scheduleConfig.selectedDays))
    {
      setCanCreateSchedule(false);
      return;
    }
    if(!validation.isDefined(scheduleConfig.startTime) || !validation.isDefined(scheduleConfig.endTime))
    {
      setCanCreateSchedule(false);
      return;
    }
    if(!validation.isDefined(scheduleConfig.zone) || !validation.isDefined(scheduleConfig.zone?.location))
    {
      setCanCreateSchedule(false);
      return;
    }
    if(!validation.isDefined(scheduleConfig.minimumAge)|| !validation.isDefined(scheduleConfig.maximumAge))
    {
      setCanCreateSchedule(false);
      return;
    }
    if(!validation.isDefined(scheduleConfig.gender))
    {
      setCanCreateSchedule(false);
      return;
    }
    if(!validation.isDefined(scheduleConfig.maxNumberOfPeople))
    {
      setCanCreateSchedule(false);
      return;
    }
    if(currentSkateProfile !== undefined && (currentSkateProfile.skatePracticeStyle === SkatePracticeStyles.CasualSkating || currentSkateProfile.skatePracticeStyle === SkatePracticeStyles.SpeedSkating))
    {
      if(parkSelected === false)
      {
        setCanCreateSchedule(false);
        return;
      }
      
    }
    setCanCreateSchedule(true);
  }, [scheduleConfig, parkSelected])
  
  useEffect(() => {
    dispatch(setSelectedDaysState(selectedDays));
  }, [selectedDays])
  
  useEffect(() => {
    dispatch(setStartTime(startTime.getTime()));
    dispatch(setEndTime(endTime.getTime()));
  }, [startTime, endTime])

  const updateSelectedDays = (selectedDays: Array<Day>) =>{
    setSelectedDays(selectedDays);
  }
 
  const createNewSchedule = () => {

    if(currentSkateProfile !== undefined && currentSkateProfile !== null)
    {
      if(scheduleConfig.endTime !== undefined && scheduleConfig.startTime !== undefined
        && scheduleConfig.zone !== undefined && scheduleConfig.minimumAge !== undefined
        && scheduleConfig.maximumAge !== undefined && scheduleConfig.gender !== undefined &&
        scheduleConfig.maxNumberOfPeople !== undefined && scheduleConfig.selectedDays !== undefined)
      {
        
        const newSchedule: ScheduleType = {
          id: uuid.v4().toString(),
          skateProfileId: currentSkateProfile.id,
          days: scheduleConfig.selectedDays,
          startTime: scheduleConfig.startTime,
          endTime: scheduleConfig.endTime,
          zones: [scheduleConfig.zone],
          minimumAge: scheduleConfig.minimumAge,
          maximumAge: scheduleConfig.maximumAge,
          gender: scheduleConfig.gender,
          maxNumberOfPeople: scheduleConfig.maxNumberOfPeople
        }
        dispatch(backupUser());
        
        //optimistic update
        dispatch(addSchedule(newSchedule));
        navigation.navigate("MySchedules" as never);

        Fetch.postSchedule(newSchedule, 
        () => {
          console.log("Schedule post success");
        },
        () => {
          console.log("Schedule post fail; rever changes");
          uiUtils.showPopUp("Error", "Coudn't create schedule");
          dispatch(revertChangesInUser());
        })
      }
      
    }
    else uiUtils.showPopUp("Error", "No skateProfile selected");
    
  
  }

  const getcreateScheduleContainer = () => {
      return(
        <ScrollView scrollEnabled={scrollEnable} contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
        <View style={[SpacingStyles.centeredContainer, {flex: 0.8}]}>
          <SelectDays selectedDays={selectedDays} onSelectedDaysChange={updateSelectedDays}></SelectDays>
        </View>
        <View style={[SpacingStyles.centeredContainer, {flex: 0.9}]}>
          <SelectHourRange 
          startTime={startTime} 
          onStartTimeChange={(value) => setStarTTime(value)}
          endTime={endTime} 
          onEndTimeChange={(value) => setEnDTime(value)}
          ></SelectHourRange>
        </View>
        {/* <View style={[SpacingStyles.centeredContainer, {flex: 0.7}]}>
          <AddSports selectedSports={selectedSports} onDelete={deleteFromSelectedSports} onAddPress={() => setSportPickerVisible(true)}></AddSports>
        </View> */}
        {
          currentSkateProfile?.skatePracticeStyle === SkatePracticeStyles.AggresiveSkating &&
          <View style={[SpacingStyles.centeredContainer, {flex: 3}]}>
            <SelectLocationAggresive onTouchInside={() => {setScrollEnable(false)}} onTouchOutside={() => {setScrollEnable(true);}}></SelectLocationAggresive>
          </View>
        }
        {
          currentSkateProfile !== undefined &&
          (currentSkateProfile.skatePracticeStyle === SkatePracticeStyles.CasualSkating || currentSkateProfile.skatePracticeStyle === SkatePracticeStyles.SpeedSkating) &&
          <View style={[SpacingStyles.centeredContainer, {flex: 3}]}>
            <SelectLocationCasualAndSpeed 
            parkSelected={parkSelected}
            setParkSelected={setParkSelected}
            onTouchInside={() => {setScrollEnable(false)}} 
            onTouchOutside={() => {setScrollEnable(true);}}></SelectLocationCasualAndSpeed>
          </View>
        }
       
        <View style={[SpacingStyles.centeredContainer, {flex: 3}]}>
          <SelectCompanion></SelectCompanion>
        </View>
      </ScrollView>
      );
  }
  

  const getBody = () => {
    return(
      <View style={[SpacingStyles.centeredContainer, SpacingStyles.fullSizeContainer, {padding: scale(14)}]}>
        {getcreateScheduleContainer()}
        {/* {uiUtils.getShowWalkthroughModal(skipWalkthroughPromptVisibility, (visibility) => setSkipWalkthroughPromptVisibility(visibility),
                                                () => console.log("Nothing"))} */}
            <QuestionModal visible={skipWalkthroughPromptVisibility} onDismiss={() => setSkipWalkthroughPromptVisibility(false)}
            question={"Skip walkthrough next time?"}
            onButton1Press={() => setSkipWalkthroughPromptVisibility(false)} button1Text={"Don't skip"}
            onButton2Press={() => { setSkipWalkthroughPromptVisibility(false)}} button2Text={"Skip"}
            ></QuestionModal>
      </View>
    );
  }

  return (
     <Layout2Piece
        header={<GeneralHeader rightButtonEnable={canCreateSchedule} onBack={() => navigation.goBack()}
        onRightButtonPress={() => createNewSchedule()} rightButtonText={"Add Schedule"}/>}
        body={getBody()}
     ></Layout2Piece>
  );
};

export default Schedule;