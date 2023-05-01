import React from 'react'
import { View } from 'react-native';

import { useNavigation } from "@react-navigation/native";
import { Appbar } from "react-native-paper";

import { AppHeader, Button } from "../general";

interface Input {
    saveButtonCallback: Function
}
const EditProfileHeader = ({saveButtonCallback}: Input) => {
    const navigation = useNavigation();

    const _goBack = () => navigation.goBack();

    return(
        <AppHeader>
            <Appbar.BackAction onPress={_goBack} />
            <View style={{width: '50%'}}></View>
            <View style={{width: '30%'}}>
                <Button text="SAVE" onPress={() => saveButtonCallback()}/>
            </View>
        </AppHeader>
       
    );
}

export default EditProfileHeader;