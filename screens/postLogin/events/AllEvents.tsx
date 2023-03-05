import React from 'react';

import { Layout3Piece } from '../../layouts';
import { EventsHeader, EventsBody } from '../../../components/events'
import { BottomBar } from '../../../components/general';

const AllEvents = () => {

    return (
        <Layout3Piece 
            header={ <EventsHeader></EventsHeader>}
            body={<EventsBody></EventsBody>}
            footer={<BottomBar></BottomBar>}
        ></Layout3Piece>
    );
};

export default AllEvents;
