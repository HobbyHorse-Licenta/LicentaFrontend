import React, {useEffect} from 'react';

import { useDispatch } from 'react-redux';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { Layout2PieceForNavigator } from '../../layouts';
import { EventsHeader, EventsBody } from '../../../components/events'
import { setBottomBarHeight } from '../../../redux/ui';

const AllEvents = () => {

    const dispatch = useDispatch();
    const bottomBarSize: number = useBottomTabBarHeight();
      
    useEffect(() => {
      dispatch(setBottomBarHeight(bottomBarSize));
    }, []);

    return (
        <Layout2PieceForNavigator 
            header={ <EventsHeader></EventsHeader>}
            body={<EventsBody></EventsBody>}
        ></Layout2PieceForNavigator>
    );
};

export default AllEvents;
