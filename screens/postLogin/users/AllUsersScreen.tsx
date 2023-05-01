import React, {useEffect, useState} from 'react'
import {View, StyleSheet} from 'react-native'
import { Divider } from 'react-native-paper';
import { UserSummary } from '../../../components/general';

import { Fetch } from '../../../services'
import { User } from '../../../types';
import { Layout1Piece } from '../../layouts';

const AllUsersScreen = () => {

    const [allUsers, setAllUsers] = useState<Array<User>>();
    useEffect(() => {
      Fetch.getAllUsers(
        (users) => setAllUsers(users),
        () => console.log("Coudn't get all users")
      );
    }, [])

    const getBody = () => {
        <View style={StyleSheet.absoluteFill}>
            {
                allUsers !== undefined &&
                allUsers.map((user, index) => {
                    return(
                        <View key={index}>
                            {index !== 0 && <Divider/>}
                            <UserSummary user={user}></UserSummary>
                        </View>
                    )
                })
            }
        </View>
    }
    
    return(
        <Layout1Piece body={getBody()}/>
    )
}