import React from "react";
import { View } from 'react-native';

import { Layout2PieceForNavigator } from '../../layouts';
import MySchedulesBody from "../../../components/mySchedules/MySchedulesBody";
import { HeaderChatIcon } from "../../../components/general/headers";

const MySchedules = () => {

  const getBody = () => {
    return(
     <View>
        <MySchedulesBody></MySchedulesBody>
     </View>
    );
  }

  return (
     <Layout2PieceForNavigator 
        header={<HeaderChatIcon></HeaderChatIcon>}
        body={getBody()}
     ></Layout2PieceForNavigator>
  );
};

export default MySchedules;