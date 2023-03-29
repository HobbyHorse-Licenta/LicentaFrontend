import React, { useEffect, useState } from "react";
import { ScrollView, View } from 'react-native';

import { scale } from "react-native-size-matters";

import { SpacingStyles } from '../../../styles';
import { AddSports, ScheduleHeader, SelectDays, SelectLocation, SelectHourRange, SelectSportModal, SelectCompanion} from '../../../components/schedule';
// import { AddSports, ScheduleHeader, SelectDays, SelectTime } from '@schedule';
import { Layout2Piece } from '../../layouts';
import { SportName } from "../../../types";



const Schedule = () => {

  const [sportPickerVisible, setSportPickerVisible] =  useState<boolean>(false);
  const [selectedSports, setSelectedSports] = useState<Array<SportName>>([]);

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


  const getcreateScheduleContainer = () => {
      return(
        <ScrollView contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
        <View style={[SpacingStyles.centeredContainer, {flex: 0.8}]}>
          <SelectDays></SelectDays>
        </View>
        <View style={[SpacingStyles.centeredContainer, {flex: 0.9}]}>
          <SelectHourRange></SelectHourRange>
        </View>
        <View style={[SpacingStyles.centeredContainer, {flex: 0.7}]}>
          <AddSports selectedSports={selectedSports} onDelete={deleteFromSelectedSports} onAddPress={() => setSportPickerVisible(true)}></AddSports>
        </View>
        <View style={[SpacingStyles.centeredContainer, {flex: 3}]}>
          <SelectLocation></SelectLocation>
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
        {
          (sportPickerVisible === true) ? (
              <SelectSportModal onSelect={addSport} onDismiss={() =>  setSportPickerVisible(false)} visible={sportPickerVisible}></SelectSportModal>
          ) : (
            <View></View>
          )
        }
      </View>
    );
  }

  return (
     <Layout2Piece
        header={<ScheduleHeader></ScheduleHeader>}
        body={getBody()}
     ></Layout2Piece>
  );
};

export default Schedule;