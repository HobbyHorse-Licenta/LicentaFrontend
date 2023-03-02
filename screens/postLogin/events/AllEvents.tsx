import React from 'react';
import { View } from 'react-native';

import { SafeAreaView } from 'react-navigation';

import { EventsHeader, EventsBody } from '../../../components/events'
import { BottomBar } from '../../../components/general';

const AllEvents = () => {

    const handleSizeChange = (layout) =>{
        const {x, y, width, height} = layout;
    }

    return (
        <SafeAreaView style={{width: '100%', height: '100%', display: 'flex'}}>
            <View style={{flex: 1, width: '100%'}} onLayout={(event) => handleSizeChange(event.nativeEvent.layout)}>
                <EventsHeader></EventsHeader>
            </View>
            <View style={{flex: 12, width: '100%'}}>
                <EventsBody></EventsBody>
            </View>
            <View style={{flex: 1, width: '100%'}}>
                <BottomBar></BottomBar>
            </View>
        </SafeAreaView>
    );
};

export default AllEvents;
