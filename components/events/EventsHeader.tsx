import React, {FC} from 'react'
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import {IconButton} from '../general';


const EventsHeader: FC = () => {

    return(
        <View style={styles.container}>
            <View style={{height: '80%', width:'20%', alignSelf: 'flex-end'}}>
                <IconButton path='../../assets/chatIcon.png'></IconButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        flexDirection: 'row',
    }
})

export default EventsHeader;