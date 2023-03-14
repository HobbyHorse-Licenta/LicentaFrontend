import React from "react";
import { StyleSheet } from "react-native";

import {Appbar, Text, useTheme} from 'react-native-paper';
import { scale } from "react-native-size-matters";

import { SpacingStyles } from "../../styles";
import {AppHeader} from '../general';

const MyProfileHeader = ({children}) => {

    const theme = useTheme();

    const _goBack = () => {
        console.log("[MyProfileHeader]: go back");
    }

    const _handleMore = () => {
        console.log("[MyProfileHeader]: handle more");
    }

    return(
        <AppHeader>
            <Appbar.BackAction onPress={_goBack} style={SpacingStyles.goBackPosition} />
            <Text variant='headlineMedium' style={{position: 'absolute', alignSelf: 'center', color: theme.colors.primary}}>{children}</Text>
            <Appbar.Action icon="dots-vertical" onPress={_handleMore} style={styles.threeDots}/>
        </AppHeader>
    );
}; 

export default MyProfileHeader;

const styles = StyleSheet.create({
    threeDots: {
        position: 'absolute',
        right: scale(15)
    }
});