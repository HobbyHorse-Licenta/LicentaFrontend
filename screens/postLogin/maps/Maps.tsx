import React from "react";
import { View, Text } from 'react-native'
import { GeneralHeader } from "../../../components/general";
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
            header={<GeneralHeader title="Maps" onChat={() => console.log("[Maps]: open chat")}></GeneralHeader>}
            body={getBody()}
    ></Layout2PieceForNavigator>
  );
};

export default Maps;