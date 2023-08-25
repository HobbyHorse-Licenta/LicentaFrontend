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
import HorizontalTextScroll from "./HorizontalTextScroll";

interface HeaderInput {
    onBack?: Function,
    title?: string,
    onChat?: Function,
    rightButtonText?: string,
    onRightButtonPress?: Function,
    rightButtonEnable?: boolean,
    menuItems?: Array<MenuItems> 
}
const GeneralHeader = ({onBack, title, onChat, rightButtonText, onRightButtonPress, menuItems, rightButtonEnable} : HeaderInput) => {

    const theme = useTheme();
    const getRightItem = () => {
        if(rightButtonText !== undefined && onRightButtonPress !== undefined)
        {
           return <Button disabled={rightButtonEnable !== undefined ? !rightButtonEnable : false} text={rightButtonText} onPress={() => onRightButtonPress()} style={styles.rightItemPosition}/>
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

    const bothButtons = getRightItem() !== null && onBack !== undefined;
    
    return(
        <View style={{position: 'relative', backgroundColor: 'green'}}>
        <AppHeader>
            {onBack !== undefined && <Appbar.BackAction onPress={() => onBack()} style={SpacingStyles.goBackPosition} />}
            {title !== undefined && bothButtons && 
            <View style={{position: 'relative', alignSelf: 'center', overflow:"hidden", width: scale(100)}}>
                <HorizontalTextScroll text={title} textTravel={170} duration={10} color="white" fontSize={26}/>
            </View>
            }
            {title !== undefined && !bothButtons && <Text variant='headlineMedium' style={[{position: 'absolute', alignSelf: 'center', color: theme.colors.primary}]}>{title}</Text>}
            {getRightItem()}
        </AppHeader>
        </View>
    );
};

export default GeneralHeader;

const styles = StyleSheet.create({
    rightItemPosition:{
        position: 'absolute',
        right: scale(10)
    }
})