import { useDispatch } from 'react-redux';
import {signOut} from "firebase/auth";

import { resetAppState } from '../redux/appState';
import { firebaseAuth } from '../WholeScreen';
import { ActionSheetIOS } from 'react-native';

class Authentication {
  
    dispatch;

    setDispatch(dispatch: any) {
        this.dispatch = dispatch;
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
  
  
  
  
  