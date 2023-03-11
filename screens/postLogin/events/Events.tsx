import React from 'react';

import { Layout2PieceForNavigator } from '../../layouts';
import { EventsHeader, EventsBody } from '../../../components/events'

const Events = () => {

    return (
        <Layout2PieceForNavigator 
            header={<EventsHeader></EventsHeader>}
            body={<EventsBody></EventsBody>}
        ></Layout2PieceForNavigator>
    );
};

export default Events;
