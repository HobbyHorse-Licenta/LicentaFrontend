import React, { useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";

import { Text } from "react-native-paper";
import { scale, verticalScale } from "react-native-size-matters";

import { Layout2Piece } from "../../layouts";
import { SpacingStyles } from "../../../styles";
import { ProfileConfigHeader } from "../../../components/profileConfig";
import { COLORS } from "../../../assets/colors/colors";

const PreSelectStyleAndExperience = () => {

    const [goNextDisabled, setGoNextDisabled] = useState(false);
    
    const getBody = () => 
    {
        return(
            <View style={[StyleSheet.absoluteFill, {justifyContent: "space-evenly", alignItems: "center"}]}>
                
                
            <ImageBackground source={{uri: "https://i.postimg.cc/W3xYNPfv/casual-Skating.jpg"}} resizeMode="cover" imageStyle={styles.backgroundImageStyle} style={styles.imageContainer}>   
               <View style={styles.descriptionView}>
                   <Text variant="headlineMedium" style={styles.defaultTextStyle}>Casual skating</Text>
                   <Text variant='bodyLarge' style={styles.defaultTextStyle}>
                   Enjoy a relaxed and leisurely skating experience, gliding in park trails and enjoying the freedom of movement.
                   </Text>
               </View>
           </ImageBackground>

            <ImageBackground source={{uri: "https://i.postimg.cc/DyJfpynv/street-Skating.jpg"}} resizeMode="cover" imageStyle={styles.backgroundImageStyle} style={styles.imageContainer}>   
               <View style={styles.descriptionView}>
                   <Text variant="headlineMedium" style={styles.defaultTextStyle}>Aggresive / Street skating</Text>
                   <Text variant='bodyLarge' style={styles.defaultTextStyle}>
                    Explore the urban landscape on your skates, mastering tricks, jumps, and slides on the city streets.
                   </Text>
               </View>
            </ImageBackground>

           <ImageBackground source={{uri: "https://i.postimg.cc/BZHyNXVc/speed-Skating2.jpg"}} resizeMode="cover" imageStyle={styles.backgroundImageStyle} style={styles.imageContainer}>   
               <View style={styles.descriptionView}>
                   <Text variant="headlineMedium" style={styles.defaultTextStyle}>Speed skating</Text>
                   <Text variant='bodyLarge' style={styles.defaultTextStyle}>
                    Embrace the need for speed as you challenge yourself in intense, high-speed skating sessions.
                   </Text>
               </View>
           </ImageBackground>

            </View>
        );
    }

    return(
        <Layout2Piece
            header={
                <ProfileConfigHeader backButton={true} disabled={goNextDisabled}
                nextScreen={'SelectStyleAndExperience'}
                 ></ProfileConfigHeader>}
            body={getBody()}
        ></Layout2Piece>
    );
};

export default PreSelectStyleAndExperience;

const styles = StyleSheet.create({
    backgroundImageStyle: {
        opacity: 0.8
    },
    imageContainer:{
        width: "100%",
        height: verticalScale(200),
        justifyContent: "center",
       
    },
    descriptionView: {
        justifyContent: "center",
        alignItems: "center",
        padding: scale(10),
        
    },
    defaultTextStyle: {
        color: "white",
        textAlign: "center",
        opacity: 1,
    }
});