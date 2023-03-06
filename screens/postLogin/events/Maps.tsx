import React from "react";
import { View, Text } from 'react-native'

import { Layout2PieceForNavigator } from "../../layouts";

const Maps = () => {

  const getBody = () => {
    return(
      <View>
        <Text>Maps</Text>
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

export default Maps;