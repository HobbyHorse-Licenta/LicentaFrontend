import React, { useEffect, useState } from 'react'
import {View, StyleSheet, ScrollView} from 'react-native'

import {Text } from 'react-native-paper'
import { scale } from 'react-native-size-matters';

import { Fetch } from '../../services';
import { SkateProfile } from '../../types';
import { PrimaryContainer } from '../general';
import SkateProfileSummary from './SkateProfileSummary';

const SkateProfiles = () => {

    const [skateProfiles, setSkateProfiles] = useState<Array<SkateProfile>>();

    useEffect(() => {
        setSkateProfiles(Fetch.getSkateProfiles());
   }, [])
   
    return(
        <PrimaryContainer styleInput={styles.mainContainer}>
        <Text variant='headlineSmall'>Skate Profiles</Text>
            {
                skateProfiles != undefined &&
                <ScrollView style={{margin: scale(5)}} horizontal={true}
                >
                    {skateProfiles.map((skateProfile, index) => {
                        return(
                            <SkateProfileSummary key={index} info={skateProfile}></SkateProfileSummary>
                        );
                    })}
                </ScrollView>
                
            }
        </PrimaryContainer>
    );
}

export default SkateProfiles;

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: scale(8),
        margin: scale(3)
    }
});