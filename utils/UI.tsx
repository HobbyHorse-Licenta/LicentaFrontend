import React from 'react';

import NotificationPopup from 'react-native-push-notification-popup';
import Color from 'color';

import { MasteringLevel } from '../types';
import { QuestionModal } from '../components/general';
import { nothing } from 'immer';


class UI {
    notificationRef: React.RefObject<NotificationPopup | null>;
    
    getShowWalkthroughModal (visible: boolean, setVisibilityMethod: (visibility: boolean) => void,
        onWalkthroughSkip: () => void) {

        return(
            <QuestionModal visible={visible} onDismiss={() => setVisibilityMethod(false)}
            question={"Skip walkthrough next time?"}
            onButton1Press={() => setVisibilityMethod(false)} button1Text={"Don't skip"}
            onButton2Press={() => {onWalkthroughSkip(); setVisibilityMethod(false)}} button2Text={"Skip"}
            ></QuestionModal>
        )
    }

    getColorBasedOnSkillLevel(level: MasteringLevel){
        switch (level) {
            case MasteringLevel.Novice:
                return '#94C11E'
                break;
            case MasteringLevel.Begginer:
                return '#EFD907'
                break;
            case MasteringLevel.Competent:
                return '#F59E11'
                break;
            case MasteringLevel.Proficient:
                return '#EC5212'
                break;
            case MasteringLevel.Expert:
                return '#E40613'
                break;
        
            default:
                return '#F59E11'
                break;
        }
    }
    setNotificationRef(ref: any) {
        this.notificationRef = ref;
    }

    /**Check against null*/
    getNotificationRef() {
        return this.notificationRef;
    }

    showPopUp ( title: string, messageBody: string, onPress?: Function, timeUntilDissapearanceInMiliseconds?: number) {
        if(this.notificationRef != null)
        {
            this.notificationRef.current?.show({
                onPress: onPress !== undefined ? onPress() : nothing,
                appTitle: 'Notification',
                timeText: 'Now',
                title: title,
                body: messageBody,
                slideOutTime: timeUntilDissapearanceInMiliseconds !== undefined ? timeUntilDissapearanceInMiliseconds : 2000
            });
        }
        else console.error("No notificationPopUp ref set");
           
    }

    darkenColor(color: string, percentage: number){
       return Color(color).darken(percentage/100).hex();
    }

    getTimeRange (startTime: number, endtime: number) {
        return `${new Date(startTime).getHours()}:${new Date(startTime).getMinutes()} - ${new Date(endtime).getHours()}:${new Date(endtime).getMinutes()}`
    }
}
const uiUtils = new UI();
export default uiUtils;
