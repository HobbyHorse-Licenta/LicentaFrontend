import React from "react";
import { View } from "react-native";

import { Layout2PieceForNavigator } from "../../layouts";
import MySchedulesBody from "../../../components/mySchedules/MySchedulesBody";
import { GeneralHeader } from "../../../components/general";

const MySchedules = () => {
  const getBody = () => {
    return (
      <View>
        <MySchedulesBody></MySchedulesBody>
      </View>
    );
  };

  return (
    <Layout2PieceForNavigator
      header={<GeneralHeader title="My Schedules"></GeneralHeader>}
      body={getBody()}
    ></Layout2PieceForNavigator>
  );
};

export default MySchedules;
