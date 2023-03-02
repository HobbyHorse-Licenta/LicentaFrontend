import React from 'react'
import { ImageBackground, View, Text, StyleSheet } from 'react-native';

const TextImage = () => {
    const image = {uri: 'https://i.postimg.cc/tR26nKb9/basket.jpg'};
    return(
        <View style={[styles.imageCard, {width: '90%', height: '100%'}]}>
            <ImageBackground source={image} style={ {width: '100%', height: '100%'}}>
                <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.mainText}>Basket</Text>
                </View>
            </ImageBackground>
        </View>
        
    );
};

export default TextImage;

const styles = StyleSheet.create({
    imageCard: {
        borderRadius: 50
    },
    mainText: {
        fontSize: 30,
        color: 'white'
    }
})