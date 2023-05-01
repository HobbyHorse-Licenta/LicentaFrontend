import React, { useEffect, useState } from "react";
import { ScrollView, View } from 'react-native';

import { scale } from "react-native-size-matters";

import { SpacingStyles } from '../../../styles';
import { AddSports, ScheduleHeader, SelectDays, SelectLocation, SelectHourRange, SelectCompanion} from '../../../components/schedule';
import { Layout2Piece } from '../../layouts';
import { SportName } from "../../../types";
import { GeneralHeader } from "../../../components/general";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { validation } from "../../../utils";



const Schedule = () => {

  const scheduleConfig = useSelector((state: RootState) => state.createScheduleState);

  const navigation = useNavigation();
  const [sportPickerVisible, setSportPickerVisible] =  useState<boolean>(false);
  const [selectedSports, setSelectedSports] = useState<Array<SportName>>([]);
  const [scrollEnable, setScrollEnable] = useState(true);
  const [canCreateSchedule, setCanCreateSchedule] = useState(false);


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
    setCanCreateSchedule(true);
  }, [scheduleConfig])
  
  const deleteFromSelectedSports = (sportToRemove: SportName) =>
  {
    setSelectedSports(selSports => {return selSports?.filter(sport => sport !== sportToRemove)});
  }
  
  const addSport = (sportToAdd: SportName) =>
  {
    const value = selectedSports?.find(sport => sport === sportToAdd);
    if(value == undefined)
    {
      setSelectedSports([...selectedSports, sportToAdd])
    }
    setSportPickerVisible(false);
  }

  
  const createNewSchedule = () => {
    console.log("Check if schedule can be created; The scheduleConfig object is: " + JSON.stringify(scheduleConfig));
  }


  const getcreateScheduleContainer = () => {
      return(
        <ScrollView scrollEnabled={scrollEnable} contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
        <View style={[SpacingStyles.centeredContainer, {flex: 0.8}]}>
          <SelectDays></SelectDays>
        </View>
        <View style={[SpacingStyles.centeredContainer, {flex: 0.9}]}>
          <SelectHourRange></SelectHourRange>
        </View>
        {/* <View style={[SpacingStyles.centeredContainer, {flex: 0.7}]}>
          <AddSports selectedSports={selectedSports} onDelete={deleteFromSelectedSports} onAddPress={() => setSportPickerVisible(true)}></AddSports>
        </View> */}
        <View style={[SpacingStyles.centeredContainer, {flex: 3}]}>
          <SelectLocation onTouchInside={() => {setScrollEnable(false)}} onTouchOutside={() => {setScrollEnable(true);}}></SelectLocation>
        </View>
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
        {/* {
          (sportPickerVisible === true) ? (
            <View></View>
              // <SelectSportModal onSelect={addSport} onDismiss={() =>  setSportPickerVisible(false)} visible={sportPickerVisible}></SelectSportModal>
          ) : (
            <View></View>
          )
        } */}
      </View>
    );
  }

  return (
     <Layout2Piece
        header={<GeneralHeader rightButtonEnable={canCreateSchedule} onBack={() => navigation.goBack()} onRightButtonPress={() => createNewSchedule()} rightButtonText={"Add Schedule"}/>}
        body={getBody()}
     ></Layout2Piece>
  );
};

export default Schedule;