import React, {useEffect, useState} from 'react'
import {View, StyleSheet} from 'react-native'
import { Divider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { UserSummary } from '../../../components/general';
import { RootState } from '../../../redux/store';

import { Fetch } from '../../../services'
import { User } from '../../../types';
import { validation } from '../../../utils';
import { Layout1Piece } from '../../layouts';

const AllUsersScreen = () => {

    const [allUsers, setAllUsers] = useState<Array<User>>();
    const {JWTTokenResult} = useSelector((state: RootState) => state.appState)

    useEffect(() => {
        if(JWTTokenResult !== undefined && !validation.isJWTTokenExpired(JWTTokenResult))
        {
            Fetch.getAllUsers(JWTTokenResult.token,
                (users) => setAllUsers(users),
                () => console.log("Coudn't get all users")
            );
        }
        else{
            //TODO refresh token
        }
      
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