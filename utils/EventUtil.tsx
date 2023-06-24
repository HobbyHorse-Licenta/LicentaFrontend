import React from 'react';

import NotificationPopup from 'react-native-push-notification-popup';
import Color from 'color';

import { MasteringLevel } from '../types';
import { QuestionModal } from '../components/general';
import { nothing } from 'immer';
import { useDispatch } from 'react-redux';


class EventUtil {
    
    darkenColor(color: string, percentage: number){
       return Color(color).darken(percentage/100).hex();
    }
}
const eventUtils = new EventUtil();
export default eventUtils;
