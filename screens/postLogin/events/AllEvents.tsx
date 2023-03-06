import React from 'react';

import { Layout2PieceForNavigator } from '../../layouts';
import { EventsHeader, EventsBody } from '../../../components/events'

const AllEvents = () => {

    return (
        <Layout2PieceForNavigator 
            header={<EventsHeader></EventsHeader>}
            body={<EventsBody></EventsBody>}
        ></Layout2PieceForNavigator>
    );
};

export default AllEvents;
