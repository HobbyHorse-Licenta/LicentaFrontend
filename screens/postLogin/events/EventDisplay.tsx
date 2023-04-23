import React, {useEffect} from "react";
import { View, Text } from 'react-native'
import {EventImage } from "../../../components/eventDisplay";
import { GeneralHeader } from "../../../components/general";

import { Event } from "../../../types";
import { Layout2Piece } from "../../layouts";

interface EventInput {
    event: Event
}

const EventDisplay = ({route, navigation}) => {

  const event: Event = route.params.event;

   
  const getBody = () => {
    return(
      <View>
        <EventImage event={event}></EventImage>
        <Text>Event display</Text>
      </View>
    );
  };
  
  return (
    <Layout2Piece
      header={<GeneralHeader onBack={navigation.goBack()} title={event.name}></GeneralHeader>}
      body={getBody()}
    ></Layout2Piece>
  );
};

export default EventDisplay;