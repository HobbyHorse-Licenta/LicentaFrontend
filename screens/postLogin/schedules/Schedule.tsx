import React, { useEffect, useState } from "react";
import { View } from 'react-native';

import { scale } from "react-native-size-matters";

import { SpacingStyles } from '../../../styles';
import { AddSports, ScheduleHeader, SelectDays, SelectLocation, SelectHourRange, SelectSportModal} from '../../../components/schedule';
// import { AddSports, ScheduleHeader, SelectDays, SelectTime } from '@schedule';
import { Layout2PieceForNavigator } from '../../layouts';
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

  const getBody = () => {
    return(
      <View style={[SpacingStyles.centeredContainer, SpacingStyles.fullSizeContainer, {flex: 1, padding: scale(14)}]}>
        <View style={[SpacingStyles.centeredContainer, {flex: 0.8}]}>
          <SelectDays></SelectDays>
        </View>
        <View style={[SpacingStyles.centeredContainer, {flex: 0.9}]}>
          <SelectHourRange></SelectHourRange>
        </View>
        <View style={[SpacingStyles.centeredContainer, {flex: 0.7}]}>
         <AddSports selectedSports={selectedSports} onDelete={deleteFromSelectedSports} onAddPress={() => setSportPickerVisible(true)}></AddSports>
        </View>
        <View style={[SpacingStyles.centeredContainer, {flex: 1.2}]}>
         <SelectLocation></SelectLocation>
        </View>
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
     <Layout2PieceForNavigator 
        header={<ScheduleHeader></ScheduleHeader>}
        body={getBody()}
     ></Layout2PieceForNavigator>
  );
};

export default Schedule;