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
import { getNetworkStateAsync } from 'expo-network';



import { setWindowHeight } from './redux/ui';
import MainStack from './stacks/MainStack';
import { Fetch } from './services';
import {authenticationUtils, uiUtils} from './utils';
import { firebaseConfig } from './firebaseConfig';
import { resetAppState, setCurrentSkateProfile, setJWTToken, setUser, setUserId } from './redux/appState';
import { User } from './types';
import LoadingScreen from './screens/preLogin/LoadingScreen';
import { RootState } from './redux/store';
import { CheckInternetScreen } from './screens/preLogin';
//import { wsUrl } from './assets/apiUrl';

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
    const [internetConnected, setInternetConnected] = useState<boolean | undefined>(undefined);
    const [waitingToRecheckInternet, setWaitingToRecheckInternet] = useState(null);
    const {user}  = useSelector((state: RootState) => state.appState);
    const [loading, setLoading] = useState(true);
    



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

 
  
  //   ////////////WEBSOCKET RELATED///////////
  //   const clientRef = useRef<WebSocket | null>(null);
  //   const [waitingToReconnect, setWaitingToReconnect] = useState(null);
  //   const [isOpen, setIsOpen] = useState(false);
  //   ////////////////////////////////////////

  // useEffect(() => {
        
  //   if (waitingToReconnect) {
  //     return;
  //   }
    
  //   console.log("Am reintrat si incercam un reconnect");

  //   // Only set up the websocket once
  //   if (!clientRef.current) {
  //     console.log("Definim websocket")
  //     const webSocketConnectionString = `${wsUrl}/EventNotifications`;
  //     console.log("Conn string: " + webSocketConnectionString)
  //     const client = new WebSocket(webSocketConnectionString);
  //     clientRef.current = client;

  //     window.client = client;

  //     client.onerror = (e) => console.error(e);

  //     client.onopen = () => {
  //       setIsOpen(true);
  //       console.log('Connected to the server websocket');
  //     };

  //     client.onclose = () => {

  //       if (clientRef.current) {
  //         // Connection failed
  //         console.log('Disconnected from websocket. Check internet or server.')
  //       } else {
  //         // Cleanup initiated from app side, can return here, to not attempt a reconnect
  //         console.log('ws closed by app component unmount');
  //         return;
  //       }

  //       if (waitingToReconnect) {
  //         return;
  //       };

  //       // Parse event code and log
  //       setIsOpen(false);
  //       console.log('ws closed');

  //       setWaitingToReconnect(true);

  //       setTimeout(() => setWaitingToReconnect(null), 5000);
  //     };

  //     client.onmessage = (e) => {
  //       console.log("Received: " + e.data);
  //       handleWebSocketPopUp(e.data);
  //     };


  //     return () => {
  //       console.log('Cleanup');
  //       // Dereference, so it will set up next time
  //       clientRef.current = null;

  //       client.close();
  //     }
  //   }

  // }, [waitingToReconnect]);
    
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
