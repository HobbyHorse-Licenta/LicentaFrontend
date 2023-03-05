import React from 'react'
import { View, StyleSheet} from 'react-native';

import { useTheme } from 'react-native-paper';

import {AllEventsSvg, MapsSvg, MyEventsSvg, ScheduleSvg, ProfileSvg} from '../svg/general';
import { SpacingStyles } from '../../styles';

const svgHeightInPercentage = '60%';

const BottomBar = () => {

    const theme = useTheme();

    return(
        <View style={[SpacingStyles.fullSizeContainer, styles.container, {backgroundColor: theme.colors.primary}]}>
            
            <View onTouchEnd={() => console.log("Schedule")} style={styles.svg}>
               <ScheduleSvg></ScheduleSvg>
            </View>

            <View onTouchEnd={() => console.log("MyEvents")} style={styles.svg}>
               <MyEventsSvg></MyEventsSvg>
            </View>

            <View onTouchEnd={() => console.log("AllEvents")} style={styles.svg}>
                <AllEventsSvg></AllEventsSvg>
            </View>

            {/* <View style={[styles.barSize, {backgroundColor: theme.colors.onSurface}]}>
            </View> */}
            <View onTouchEnd={() => console.log("Maps")} style={styles.svg}>
               <MapsSvg></MapsSvg>
            </View>

            <View onTouchEnd={() => console.log("MyProfile")} style={styles.svg}>
               <ProfileSvg></ProfileSvg>
            </View>
            
            
            
        </View>
    );
};

export default BottomBar;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
        
    },
    barSize: {
        height: '60%',
        width:'0.5%',
        margin: '1%'
    },
    svg: {
        height: svgHeightInPercentage,
        width:'18%'}
})