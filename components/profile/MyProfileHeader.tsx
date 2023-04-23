import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";

import { useNavigation } from '@react-navigation/native';
import {Appbar, Divider, Menu, Text, useTheme} from 'react-native-paper';
import { scale } from "react-native-size-matters";

import { SpacingStyles } from "../../styles";
import { authenticationUtils } from "../../utils";
import {AppHeader, PopupMenu} from '../general';

interface Input {
    backButtonVisible?: boolean,
    children: ReactNode
}
const MyProfileHeader = ({backButtonVisible, children} : Input) => {

    const theme = useTheme();
    const [moreOptionsVisible, setMoreOptionsVisible] = React.useState(false);
    const navigation = useNavigation();
    const openMenu = () => setMoreOptionsVisible(true);
    const closeMenu = () => setMoreOptionsVisible(false);

    const _goBack = () => {
        console.log("[MyProfileHeader]: go back");
    }
//<Appbar.Action icon="dots-vertical" onPress={openMenu} style={styles.threeDots}/>
    return(
        <AppHeader>
           {backButtonVisible && <Appbar.BackAction onPress={_goBack} style={SpacingStyles.goBackPosition} />}
            <Text variant='headlineMedium' style={{position: 'absolute', alignSelf: 'center', color: theme.colors.primary}}>{children}</Text>
            <PopupMenu
            items={[
                {text: 'Edit', function: () => navigation.navigate('EditProfile' as never)},
                {text: 'Logout', function: () => authenticationUtils.logOut()}
            ]}
            />
        </AppHeader>
    );
}; 

export default MyProfileHeader;

const styles = StyleSheet.create({
    threeDots: {
        
    }
});