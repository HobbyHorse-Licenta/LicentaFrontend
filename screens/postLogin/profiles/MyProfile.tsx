import React from "react";
import { View, Text } from 'react-native'
import MySchedulesBody from "../../../components/mySchedules/MySchedulesBody";

import { MyProfileHeader } from "../../../components/profile";
import { Layout2PieceForNavigator } from "../../layouts";

const MyProfile = () => {

  const getBody = () => {
    return(
      <View>
        <MySchedulesBody></MySchedulesBody>
      </View>
    );
  };
  
  return (
    <Layout2PieceForNavigator 
            header={<MyProfileHeader>My Profile</MyProfileHeader>}
            body={getBody()}
    ></Layout2PieceForNavigator>
  );
};

export default MyProfile;