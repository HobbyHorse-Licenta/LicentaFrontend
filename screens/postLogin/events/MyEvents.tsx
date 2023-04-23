import React, {useEffect} from "react";
import { View, Text } from 'react-native'

import { MyEventsHeader } from "../../../components/myEvents";
import { Layout2PieceForNavigator } from "../../layouts";

const MyEvents = () => {


  
  const getBody = () => {
    return(
      <View>
        <Text>My Events</Text>
      </View>
    );
  };
  
  return (
    <Layout2PieceForNavigator 
            header={ <MyEventsHeader></MyEventsHeader>}
            body={getBody()}
    ></Layout2PieceForNavigator>
  );
};

export default MyEvents;