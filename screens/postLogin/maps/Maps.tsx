import React from "react";
import { View, Text } from 'react-native'
import { MapsBody, MapsHeader } from "../../../components/maps";

import { Layout2PieceForNavigator } from "../../layouts";

const Maps = () => {

  const getBody = () => {
    return(
      <View>
        <MapsBody></MapsBody>
      </View>
    );
  };
  
  return (
    <Layout2PieceForNavigator 
            header={<MapsHeader></MapsHeader>}
            body={getBody()}
    ></Layout2PieceForNavigator>
  );
};

export default Maps;