import { useDispatch } from 'react-redux';
import {signOut} from "firebase/auth";

import { resetAppState } from '../redux/appState';
import { firebaseAuth } from '../WholeScreen';
import { ActionSheetIOS } from 'react-native';
import uiUtils from './UI';


import { signInWithEmailAndPassword } from "firebase/auth";


import { Fetch } from '../services';
import {setJWTToken, setUser} from '../redux/appState'

class Authentication {
  
    dispatch;

    setDispatch(dispatch: any) {
        this.dispatch = dispatch;
    }

    login = (email: string, password: string, finallyFunction?: Function) => {
      signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        // Signed in 
        userCredential.user.getIdToken().then((jwtToken) => {
            this.dispatch(setJWTToken(jwtToken));
        })
        try {
            console.log("set is loading to true");
            Fetch.getUser(userCredential.user.uid, (user) => {
                this.dispatch(setUser(user)); finallyFunction !== undefined && finallyFunction()}, () =>{finallyFunction !== undefined && finallyFunction()});
        } catch (error) {
            console.error("No user in database corresponding to this firebase user");
            finallyFunction !== undefined && finallyFunction();
        }
            //TODO: add refresh token to appState;
        })
        .catch((error) => {
            finallyFunction !== undefined && finallyFunction();
            if(error.code = 'auth/user-not-found')
            {
                uiUtils.showPopUp("Error","Incorrect credentials");
            }
            else console.error(error.code);
        });
    }

    logOut = () => {
        signOut(firebaseAuth).then(() => {
          this.dispatch(resetAppState());
        })
        .catch(() => 
          console.error("Coudn't sign out")
        );
      }
    }

const authenticationUtils = new Authentication();
export default authenticationUtils;
  
  
  
  
  