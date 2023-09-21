import React from "react";

import { Layout2PieceForNavigator } from "../../layouts";
import { EventsBody } from "../../../components/events";
import { GeneralHeader } from "../../../components/general";

const Events = () => {
  return (
    <Layout2PieceForNavigator
      header={<GeneralHeader title="Event suggestions"></GeneralHeader>}
      body={<EventsBody></EventsBody>}
    ></Layout2PieceForNavigator>
  );
};

export default Events;
