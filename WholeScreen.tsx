import React, { createContext, MutableRefObject, useEffect, useMemo, useRef, useState} from 'react'
import { View, StatusBar, Dimensions, Platform } from 'react-native';

import * as Notifications from 'expo-notifications';
import { useDispatch, useSelector } from 'react-redux';
import NotificationPopup from 'react-native-push-notification-popup';
import { useTheme } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { initializeApp } from 'firebase/app';
import { verticalScale } from 'react-native-size-matters';
import 'firebase/auth';
import { nothing } from 'immer';
import { getAuth, onAuthStateChanged, Auth } from "firebase/auth";
import type { FirebaseApp } from 'firebase/app';
import { getNetworkStateAsync } from 'expo-network';
import { Subscription } from 'expo-modules-core';

import { setWindowHeight } from './redux/ui';
import MainStack from './stacks/MainStack';
import { Fetch } from './services';
import {authenticationUtils, uiUtils, validation} from './utils';
import { firebaseConfig } from './firebaseConfig';
import { resetAppState, setJWTTokenResult, setNeedsEventsRefresh, setNeedsRecommendedEventsRefresh, setNeedsSchedulesRefresh, setUser, setUserId } from './redux/appState';
import { User } from './types';
import LoadingScreen from './screens/preLogin/LoadingScreen';
import { RootState } from './redux/store';
import { CheckInternetScreen } from './screens/preLogin';
import { useTourGuideController } from 'rn-tourguide';
import { setCurrentSkateProfile } from './redux/globalState';

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


export let ScheduleTourGuideController;

const WholeScreen = () => {
    ScheduleTourGuideController = useTourGuideController('schedule')
    const dispatch = useDispatch();
    const theme = useTheme();
    const popUp = useRef<NotificationPopup | null>(null);
    const {JWTTokenResult} = useSelector((state: RootState) => state.appState)
    const windowHeight = useMemo(() => getWindowHeight(), []);
    const [internetConnected, setInternetConnected] = useState<boolean | undefined>(undefined);
    const {user}  = useSelector((state: RootState) => state.appState);
    const [loading, setLoading] = useState(true);



    ////EXPO PUSH////
    const notificationListener = useRef<Subscription>();

    useEffect(() => {
    if(user !== null && user !== undefined)
    {
      registerForPushNotificationsAsync().then(token => postExpoPushToken(token, user));
    }

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      triggerRefreshBasedOnNotification(notification);
    });

    return () => {
      if(notificationListener.current !== undefined)
      {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
    };
    }, [user]);


    ////////////////
    
    useEffect(() => {
      checkInternet();
    }, [])

    useEffect(() => {
      if(user !== undefined && user !== null)
      {
        if(user.skateProfiles !== undefined && user.skateProfiles !== null && user.skateProfiles.length !== 0)
        {
          dispatch(setCurrentSkateProfile(user.skateProfiles[0]));
        }
      }
    }, [user])

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
    
    const getNetInfo = async() => {
      const netInfo = await getNetworkStateAsync();
      return netInfo;
    }
    
    const checkInternet = () => {
      getNetInfo().then(info => {
        setInternetConnected(info.isConnected);
        setTimeout(() => {
          checkInternet();
        }, 2000);
      });
    }

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

    const triggerRefreshBasedOnNotification = (notification) => {
      if(notification.request.content.title !== null)
      {
        switch (notification.request.content.title) {
          case "New Event":
            //also show notification
            //this triggers a useEffect in EventsBody component
            dispatch(setNeedsRecommendedEventsRefresh(true));
            break;
          case "Event changes":
            //this triggers a useEffect in EventsBody and myEventsBody component
            dispatch(setNeedsRecommendedEventsRefresh(true));
            dispatch(setNeedsEventsRefresh(true));
            break;
          case "Event delete":
            //this triggers a useEffect in EventsBody and myEventsBody component
            dispatch(setNeedsRecommendedEventsRefresh(true));
            dispatch(setNeedsEventsRefresh(true));
            break;
          case "Schedule delete":
            //this triggers a useEffect in MySchedules
            dispatch(setNeedsSchedulesRefresh(true));
            break;
            
          default:
            dispatch(setNeedsRecommendedEventsRefresh(true));
            dispatch(setNeedsEventsRefresh(true));
            dispatch(setNeedsSchedulesRefresh(true));
            break;
        }
      }
    }

    const postExpoPushToken = (expoPushToken: string, connectedUser: User) => {
      if(expoPushToken !== undefined && expoPushToken !== null)
      {
        if(connectedUser !== undefined && connectedUser !== null && (connectedUser.pushNotificationToken === null || connectedUser.pushNotificationToken === undefined || connectedUser.pushNotificationToken.length === 0))
        {
          const updatedUser: User = {
            ...connectedUser,
            pushNotificationToken: expoPushToken
          }
  
          if(JWTTokenResult !== undefined && !validation.isJWTTokenExpired(JWTTokenResult))
          {
            Fetch.putUser(JWTTokenResult.token,
              connectedUser.id, updatedUser, 
              () => console.log("Posted user notificationToken succesfully"),
              () => uiUtils.showPopUp("Error", "Couldn't post notification token to database"))
          }
          else {
            //TODO refresh token
          }
          
        }
        else console.log("User undefined at this moment; can't post notification token");
      }
    }

    async function registerForPushNotificationsAsync() {
      let token;
    
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
  
        console.log("looking for permissions");
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          console.log("Permission was not granted, so it's asking for it")
        }
        try {
          token = (await Notifications.getExpoPushTokenAsync()).data;
        } catch (error) {
          console.log("Coudn't get token")
        }
      return token;
    }

    const currentUserJWTTokenValid = (user) => {
      if (user) {
        console.log("USER: " + user.email);
        user.getIdTokenResult(true).then((idTokenResult) => {
          dispatch(setJWTTokenResult(idTokenResult))
          const now = new Date().getTime();
          if (validation.isJWTTokenExpired(idTokenResult)) {
            console.error('Token is expired');
            uiUtils.showPopUp("TOKEN", "A EXPIRAT, ACUM TE SCOTEAM AFARA", () => nothing, 6000)
            //dispatch(resetAppState());
          } else {
            console.log('Token is valid');
            if(user.uid !== undefined)
            {
              console.log("urmeaza sa incerc databaseul pentru userul cu id => " + user.uid);
              dispatch(setUserId(user.uid));
              dispatch(setJWTTokenResult(idTokenResult));
              if(idTokenResult !== undefined && !validation.isJWTTokenExpired(idTokenResult))
              {
                Fetch.getUser(idTokenResult.token, user.uid, (fetchedUser: User) => {
                  console.log("Fetched user with id: " + fetchedUser.id);
                  dispatch(setUser(fetchedUser)); setLoading(false);}
                  , () => setLoading(false))
              }
              else {
                //TODO refresh token
              }
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
          {(loading === true || internetConnected === undefined) && <LoadingScreen></LoadingScreen>}
          {loading === false && internetConnected === true && <MainStack></MainStack>}
          {loading === false && internetConnected === false && <CheckInternetScreen></CheckInternetScreen>}
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
