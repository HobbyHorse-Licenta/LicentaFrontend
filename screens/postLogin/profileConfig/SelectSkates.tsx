import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";

import { Appbar, Text, RadioButton, useTheme } from "react-native-paper";
import { scale, verticalScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { AppHeader, PrimaryContainer, Button, SelectionCard } from "../../../components/general";
import { setInitialProfileConfigured } from "../../../redux/appState";
import { Layout2Piece } from "../../layouts";
import { SpacingStyles } from "../../../styles";
import { SkateType, SportName } from "../../../types";
import { InlineSkatesSvg } from "../../../components/svg/sports";
import { aggresiveSkatesUrl, casualSkatesUrl, speedSkatesUrl } from "../../../assets/imageUrls";
import { setSkateType } from "../../../redux/configProfileState";

const SelectSkates = () => {

    const {skateType} = useSelector((state: any) => state.configProfile)

    const [selectedSkateType, setSelectedSkateType] = useState<SkateType | undefined>(skateType);
    const [goNextDisabled, setGoNextDisabled] = useState(true);

    const navigation = useNavigation();
    const dispatch = useDispatch();
    
    useEffect(() => {
     console.log("SKATE TYPE: " + selectedSkateType);
    }, [])
    

    useEffect(() => {
       console.log("value from state: " + skateType);
    }, [selectedSkateType])

    useEffect(() => {
        //new skate type selected, update in configState
        dispatch(setSkateType(selectedSkateType));

        if(selectedSkateType != undefined)
            setGoNextDisabled(false);
        else setGoNextDisabled(true);
    }, [selectedSkateType])
    
    const getCards = () => {
        const keys = Object.values(SkateType);

        const getImageUri = (skateType: SkateType) =>
        {
            switch (skateType) {
                case SkateType.AggressiveSkates:
                    return aggresiveSkatesUrl;
                break;
                case SkateType.CasualSkates:
                    return casualSkatesUrl;
                break;
                case SkateType.SpeedSkates:
                    return speedSkatesUrl;
                break;
                default:
                    return casualSkatesUrl;
                break;
            }
        }


        const flipSelectedSkateType = (skateType : SkateType) =>{
            if(selectedSkateType != undefined && selectedSkateType === skateType)
                setSelectedSkateType(undefined);
            else setSelectedSkateType(skateType);
        }

        return(
            
            keys.map((skateType, index) => {
                return(
                    <SelectionCard key={index}
                                   text={skateType}
                                   selectState={selectedSkateType === skateType}
                                   flipSelectState={() => flipSelectedSkateType(skateType)}
                                   style={styles.optionTile}>
                        <Image style={styles.image} resizeMode='center' source={{uri: getImageUri(skateType)}}></Image>
                    </SelectionCard>
                );
            })
        );
        
    }

    const getHeader = () => 
    {
        const _goBack = () => {
            console.log("[SelectSkates]: go back in config")
            navigation.goBack();
        }

        const _goNext = () => {
            if(selectedSkateType != undefined)
            {
               
                // navigation.navigate("")
                // dispatch(setInitialProfileConfigured(true));
            }
        }

        return(
            <AppHeader>
                <Appbar.BackAction style={{left: scale(20), position: 'absolute'}} onPress={_goBack} />
                <Button disabled={goNextDisabled} text="NEXT" callBack={_goNext} style={{position: 'absolute', right: scale(20)}}/>
            </AppHeader>
        );
    }

    const getBody = () => 
    {
        return(
            <View style={[StyleSheet.absoluteFill,SpacingStyles.centeredContainer]}>
                <Text variant='headlineMedium' style={{margin: verticalScale(15)}}>Select your skates:</Text>
                {getCards()}
            </View>
        );
    }

    return(
        <Layout2Piece
            header={ getHeader()}
            body={getBody()}
        ></Layout2Piece>
    );
};

export default SelectSkates;

const styles = StyleSheet.create({
    optionTile: {
        height: verticalScale(150),
        width: scale(230),
    },
    image: {
        width: scale(150),
        height: verticalScale(70)
    }
});