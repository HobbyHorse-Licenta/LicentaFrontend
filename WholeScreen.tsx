import React, { createContext, MutableRefObject, useEffect, useMemo, useRef, useState} from 'react'
import { View, StatusBar, Dimensions, Platform } from 'react-native';


import { useDispatch, useSelector } from 'react-redux';
import NotificationPopup from 'react-native-push-notification-popup';
import { useTheme } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { initializeApp } from 'firebase/app';
import { verticalScale } from 'react-native-size-matters';
import 'firebase/auth';
import { getAuth, onAuthStateChanged, Auth } from "firebase/auth";
import type { FirebaseApp } from 'firebase/app';


import { setWindowHeight } from './redux/ui';
import MainStack from './stacks/MainStack';
import { Fetch } from './services';
import {authenticationUtils, uiUtils} from './utils';
import { firebaseConfig } from './firebaseConfig';
import { resetAppState, setJWTToken, setUser, setUserId } from './redux/appState';
import { User } from './types';
import LoadingScreen from './screens/preLogin/LoadingScreen';
import { RootState } from './redux/store';

const windowH = Dimensions.get("window").height;


const getWindowHeight = () => {
  if(Platform.OS === 'android')
  {
    return windowH;
  }
  else if(Platform.OS === 'ios')
  {
    return windowH - getStatusBarHeight(); 
  }  
}

export const NotifRefProvider = createContext<MutableRefObject<NotificationPopup | null> | null>(null);

export const firebaseApp : FirebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth : Auth  = getAuth(firebaseApp);


const WholeScreen = () => {
  
    const dispatch = useDispatch();
    const theme = useTheme();
    const popUp = useRef<NotificationPopup | null>(null);
    const windowHeight = useMemo(() => getWindowHeight(), []);
    const [loading, setLoading] = useState(true);

    
//TODO on ios the tabbar si covering the screen SHOULD BE SOLVED

 ///////////SETTING THINGS UP AND VERIFYING LOGIN///////////
    useEffect(() => {
     
      authenticationUtils.setDispatch(dispatch);

      onAuthStateChanged(firebaseAuth, (firebaseUser) => {
        setLoading(true);
        checkUser(firebaseUser);
      });
    }, []);

    useEffect(() => {
      if(windowHeight != undefined)
        dispatch(setWindowHeight(windowHeight));
    }, [windowHeight]);

    useEffect(() => {
      if(popUp !== null)
        uiUtils.setNotificationRef(popUp);
    }, [popUp])
    
    const checkUser = (user) => {
      if (user !== null && user !== undefined) 
      {
        currentUserJWTTokenValid(user);
      }
      else{
        console.log("No user logged in, reseting app state");
        dispatch(resetAppState());
        setLoading(false);
      } 
    }
    ///////////////////////////////////////////

    const currentUserJWTTokenValid = (user) => {
      if (user) {
        console.log("USER: " + user.email);
        user.getIdTokenResult().then((idTokenResult) => {
          dispatch(setJWTToken(idTokenResult.token))
          const now = new Date().getTime();
          if (idTokenResult.expirationTime < now) {
            console.error('Token is expired');
            dispatch(resetAppState());
          } else {
            console.log('Token is valid');
            if(user.uid !== undefined)
            {
              console.log("urmeaza sa incerc databaseul pentru userul cu id => " + user.uid);
              dispatch(setUserId(user.uid));
              dispatch(setJWTToken(idTokenResult.token));
              Fetch.getUser(user.uid, (fetchedUser: User) => {
                                  console.log("Fetched user with id: " + fetchedUser.id);
                                  dispatch(setUser(fetchedUser)); setLoading(false);}
                                  , () => setLoading(false))
            }
          }
        }).catch((err) => {
          console.error('Error occurred while checking token:', err);
          dispatch(resetAppState());
        });
      }
    }
   
    const getBody = () => {
      return (
      <View>
        <StatusBar
          animated={true}
          backgroundColor={theme.colors.primary}
          barStyle={'dark-content'}
          showHideTransition={undefined}
          hidden={false}
        />
        <NotifRefProvider.Provider value={popUp}>
          {loading === true && <LoadingScreen></LoadingScreen>}
          {loading === false && <MainStack></MainStack>}
        </NotifRefProvider.Provider>
        <View style={{width: '100%', height: 9, position: "absolute", top: Platform.OS === 'ios' ? 0 : -verticalScale(30)}}>
          <NotificationPopup
          ref={popUp}
          shouldChildHandleResponderStart={true}
          shouldChildHandleResponderMove={true} />
        </View>
      </View>
      );
    }
    
    return (
        getBody()
   );
};

export default WholeScreen;
