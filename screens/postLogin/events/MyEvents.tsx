import React from "react";
import { View, Text } from 'react-native'

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
            header={ <View></View>}
            body={getBody()}
    ></Layout2PieceForNavigator>
  );
};

export default MyEvents;