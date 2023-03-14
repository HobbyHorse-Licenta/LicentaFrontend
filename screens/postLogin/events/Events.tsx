import React from 'react';

import { Layout2PieceForNavigator } from '../../layouts';
import { EventsBody } from '../../../components/events'
import { HeaderChatIcon } from '../../../components/general/headers';

const Events = () => {

    return (
        <Layout2PieceForNavigator 
            header={<HeaderChatIcon></HeaderChatIcon>}
            body={<EventsBody></EventsBody>}
        ></Layout2PieceForNavigator>
    );
};

export default Events;
