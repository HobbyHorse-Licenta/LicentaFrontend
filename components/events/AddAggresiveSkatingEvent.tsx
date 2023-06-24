import React from "react";
import { View, StyleSheet} from "react-native";

import { Text, useTheme } from "react-native-paper";
import { scale, verticalScale } from "react-native-size-matters";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { SkatePracticeStyles } from "../../types";

import { PrimaryContainer, SvgView } from "../general";
import { PlusSvg } from "../svg/general";

interface Input {
    onPress: Function
}

const AddAggresiveSkatingEvent = ({onPress} : Input) =>
{

    const {currentSkateProfile} = useSelector((state: RootState) => state.globalState);
    const theme = useTheme();
    const isAggresiveSkatingProfile = () => {
        if(currentSkateProfile !== undefined && currentSkateProfile.skatePracticeStyle === SkatePracticeStyles.AggresiveSkating)
            return true;
        else return false;
    }

    const getStyle = () => {
        if(isAggresiveSkatingProfile())
            return styles.scheduleContainer;
        else return {...styles.scheduleContainer, backgroundColor: theme.colors.surfaceDisabled}
    }
    
    return (
        <PrimaryContainer styleInput={getStyle()} onPress={() => isAggresiveSkatingProfile() === true && onPress()}>
            <View style={{paddingRight: scale(10), flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <SvgView size="big" style={{backgroundColor: theme.colors.background}}>
                    <PlusSvg></PlusSvg>
                </SvgView>
                <Text style={{marginLeft: scale(10)}}>Aggresive skating event</Text>
            </View>
            {isAggresiveSkatingProfile() === false && <Text style={{color: theme.colors.tertiary}} variant="labelSmall">Only available for aggresive skating</Text>}
        </PrimaryContainer>
    );
}

export default AddAggresiveSkatingEvent;

const styles = StyleSheet.create({
    scheduleContainer: {
        width: '80%',
        height: verticalScale(90),
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: scale(10),
        padding: scale(10)
      },
})