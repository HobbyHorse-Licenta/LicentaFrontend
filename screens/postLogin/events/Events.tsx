import React, {useEffect} from 'react';

import { Layout2PieceForNavigator } from '../../layouts';
import { EventsBody } from '../../../components/events';
import { GeneralHeader } from '../../../components/general';

const Events = ({navigation}) => {

    useEffect(() => {
        //console.log("MERGEM LA PAGINA DORITA");
         //TODO: MERGEM LA PAGINA DORITA
         //navigation.navigate('MyProfileStack', { screen: 'EditProfile'});
         ///
      }, [])

    return (
        <Layout2PieceForNavigator 
            header={<GeneralHeader onChat={() => console.log("chat")}></GeneralHeader>}
            body={<EventsBody></EventsBody>}
        ></Layout2PieceForNavigator>
    );
};

export default Events;
