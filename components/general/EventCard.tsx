import React, { useState, useEffect} from 'react'
import { View, StyleSheet, Dimensions, Image} from 'react-native';

import { verticalScale } from 'react-native-size-matters';
import { useTheme, Text } from 'react-native-paper';

import Button from './Button';
import { EventDescription } from '../../types';
import { SpacingStyles } from '../../styles';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const computeTextFontSize = (size: number) => {
    const res = verticalScale(size);
    if(res <= 13)
    {
        return 13;
    }
    else return res;
}

const EventCard = () => {

    const [dimensions, setDimensions] = useState({
        window: windowDimensions,
        screen: screenDimensions,
      });

    const image = {uri: 'https://i.postimg.cc/tR26nKb9/basket.jpg'};
    const theme = useTheme();
    const basketEventDescription: EventDescription = {
        level: "Begginer",
        location: "Gheorgheni nr. 2",
        note: ""
    };

    useEffect(() => {
    const subscription = Dimensions.addEventListener(
        'change',
        ({window, screen}) => {
        setDimensions({window, screen});
        },
    );
    return () => subscription?.remove();
    });

    const computeWidth = () => 80/100*dimensions.window.width;
    const computeHeight = () => 25/100*dimensions.window.height;

    function joinEvent(){
        console.log("join event");

        console.log(propertiesOf<EventDescription>(basketEventDescription))
    }

    function propertiesOf<TObj>(_obj: (TObj | undefined) = undefined) {
        return function result<T extends keyof TObj>(name: T) {
            return name;
        }
    }

    return(
        <View style={[styles.container, styles.roundness, {width: computeWidth(), height: computeHeight()}]}>

           <View style={{width:'40%', height:'100%'}}>
                <Image source={image} style={[styles.leftRoundness, {width: '100%', height: '100%', resizeMode: 'cover'}]}></Image>
           </View>

           <View style={[SpacingStyles.centeredContainer, styles.rightRoundness, {backgroundColor: theme.colors.primary}, {width:'60%', height:'100%', paddingRight: '3%', paddingTop:'3%', paddingBottom: '3%'}]}>
                <View style={[{width:'80%', padding: '6%', flex: 6, flexWrap: 'wrap', backgroundColor: theme.colors.onSecondary}, styles.roundness, SpacingStyles.centeredContainer]}>
                    {/* <Text style={styles.descriptiomText}>Friendly basketball game in Gheorgheni Park. Level: Begginers, Address: Strada Gheorgheni nr. 5
                    Friendly basketball game in Gheorgheni Park. Level: Begginers, Address: Strada Gheorgheni nr. 5
                    </Text> */}
                     <Text style={styles.descriptiomText}> 
                     Mole fuje, nime nu-l ajunje
                    </Text>
                </View>
                <View style={{width:'80%', flex: 1, margin: '5%'}}>
                    <Button text='Join' callBack={joinEvent}></Button>
                </View>
           </View>

        </View>
    );
};

export default EventCard;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        
        margin: '2%',
        backgroundColor: 'white'
       
    },
    roundness: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    rightRoundness: {
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15
    },
    leftRoundness: {
        borderBottomLeftRadius: 15,
        borderTopLeftRadius: 15,
    },
    descriptiomText: {
        fontSize: computeTextFontSize(12),
    }
});