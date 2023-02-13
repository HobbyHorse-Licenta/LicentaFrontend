import React, {FC} from 'react';
import {Image, View, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { EventsHeader } from '../../../components/events';

const AllEvents: FC = () => {
    return (
        
        <SafeAreaView>
            {/* <EventsHeader></EventsHeader> */}
            <View style={{height:'100%', width: '100%', backgroundColor: 'red'}}>
                {/* <Text>"Ciao fratilor"</Text> */}
            </View>
        </SafeAreaView>
    );
};

export default AllEvents;
