import React from "react";
import {StyleSheet, View} from 'react-native'

import { useNavigation } from "@react-navigation/native";
import { Appbar, Text, useTheme } from "react-native-paper";
import {scale} from 'react-native-size-matters'

import AppHeader from "./AppHeader";
import { SpacingStyles } from "../../styles";
import SvgView from "./SvgView";
import { ChatSvg } from "../svg/general";
import Button from "./Button";
import PopupMenu, { MenuItems } from "./PopupMenu";

interface HeaderInput {
    onBack?: Function,
    title?: string,
    onChat?: Function,
    rightButtonText?: string,
    onRightButtonPress?: Function,
    menuItems?: Array<MenuItems> 
}
const GeneralHeader = ({onBack, title, onChat, rightButtonText, onRightButtonPress, menuItems} : HeaderInput) => {

    const theme = useTheme();
    const getRightItem = () => {
        if(rightButtonText !== undefined && onRightButtonPress !== undefined)
        {
           return <Button text={rightButtonText} onPress={() => onRightButtonPress()} style={styles.rightItemPosition}/>
        }
        if(onChat !== undefined)
        {
           return (
            <SvgView size='small' onPress={() => onChat()} style={{...styles.rightItemPosition, backgroundColor: theme.colors.primary}}>
                <ChatSvg></ChatSvg>
            </SvgView>
           )
        }
        if(menuItems !== undefined)
        {
            return(
                <PopupMenu
                buttonStyle={styles.rightItemPosition}
                items={menuItems}
                />
            )
        }
    }
    return(
        <View style={{position: 'relative', backgroundColor: 'green'}}>
        <AppHeader>
            {onBack !== undefined && <Appbar.BackAction onPress={() => onBack()} style={SpacingStyles.goBackPosition} />}
            {title !== undefined && <Text variant='headlineMedium' style={{position: 'absolute', alignSelf: 'center', color: theme.colors.primary}}>{title}</Text>}
            {getRightItem()}
            
        </AppHeader>
        </View>
    );
};

export default GeneralHeader;

const styles = StyleSheet.create({
    rightItemPosition:{
        position: 'absolute',
        right: scale(5)
    }
})