import React, {useEffect} from 'react';

import { Layout2PieceForNavigator } from '../../layouts';
import { EventsBody } from '../../../components/events';
import { GeneralHeader } from '../../../components/general';

const Events = ({navigation}) => {

    useEffect(() => {
        console.log("MERGEM LA PAGINA DORITA");
         //TODO: MERGEM LA PAGINA DORITA
         //navigation.navigate('EventsStack', { screen: 'CreateEvent'});
         navigation.navigate('EventsStack', { screen: 'Events'});
         //navigation.navigate('MySchedulesStack', { screen: 'MySchedules'});
         
      }, [])

    return (
        <Layout2PieceForNavigator 
            header={<GeneralHeader title="Event suggestions"></GeneralHeader>}
            body={<EventsBody></EventsBody>}
        ></Layout2PieceForNavigator>
    );
};

export default Events;
