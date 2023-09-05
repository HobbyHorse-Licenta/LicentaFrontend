import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";

import { Text } from "react-native-paper";
import { scale, verticalScale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import uuid from 'react-native-uuid'

import { SelectionCard } from "../../../components/general";
import { Layout2Piece } from "../../layouts";
import { SpacingStyles } from "../../../styles";
import { SkatesType } from "../../../types";
import { aggresiveSkatesUrl, casualSkatesUrl, speedSkatesUrl } from "../../../assets/imageUrls";
import { setSkateType } from "../../../redux/configProfileState";
import { ProfileConfigHeader } from "../../../components/profileConfig";
import { RootState } from "../../../redux/store";
import { resetAppState } from "../../../redux/appState";
import { resetGlobalState } from "../../../redux/globalState";

const SelectSkates = () => {

    const {skateType} = useSelector((state: any) => state.configProfile)

    const {addingSkateProfile} = useSelector((state: RootState) => state.appState);

    const [selectedSkateType, setSelectedSkateType] = useState<SkatesType | undefined>(skateType);
    const [goNextDisabled, setGoNextDisabled] = useState(true);

    const dispatch = useDispatch();
    

    useEffect(() => {
        //new skate type selected, update in configState
        dispatch(setSkateType(selectedSkateType));

        if(selectedSkateType != undefined)
            setGoNextDisabled(false);
        else setGoNextDisabled(true);
    }, [selectedSkateType])
    
    const getCards = () => {
        const keys = Object.values(SkatesType);

        const getImageUri = (skateType: SkatesType) =>
        {
            switch (skateType) {
                case SkatesType.AggressiveSkates:
                    return aggresiveSkatesUrl;
                break;
                case SkatesType.CasualSkates:
                    return casualSkatesUrl;
                break;
                case SkatesType.SpeedSkates:
                    return speedSkatesUrl;
                break;
                default:
                    return casualSkatesUrl;
                break;
            }
        }


        const flipSelectedSkateType = (skateType : SkatesType) =>{
            if(selectedSkateType != undefined && selectedSkateType === skateType)
                setSelectedSkateType(undefined);
            else setSelectedSkateType(skateType);
        }

        return(
            
            keys.map((skateType, index) => {
                return(
                    <SelectionCard key={uuid.v4().toString()}
                                   text={skateType}
                                   selectState={selectedSkateType === skateType}
                                   flipSelectState={() => flipSelectedSkateType(skateType)}
                                   style={styles.optionTile}>
                        <Image style={styles.image} resizeMode='contain' source={{uri: getImageUri(skateType)}}></Image>
                    </SelectionCard>
                );
            })
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
            header={ <ProfileConfigHeader backButton={true} disabled={goNextDisabled}
            nextScreen={addingSkateProfile === true ? 'SelectStyleAndExperience' : 'PreSelectStyleAndExperience'}
            ></ProfileConfigHeader>}
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