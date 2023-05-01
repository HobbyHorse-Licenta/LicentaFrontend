import React from 'react';
import NotificationPopup from 'react-native-push-notification-popup';
import { MasteringLevel } from '../types';

class UI {
    notificationRef: React.RefObject<NotificationPopup | null>;
 
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

    showPopUp ( title: string, messageBody: string, onPress?: Function) {
        if(this.notificationRef != null)
        {
            if(onPress !== undefined)
            {
                this.notificationRef.current?.show({
                    onPress: onPress(),
                    appTitle: 'Notification',
                    timeText: 'Now',
                    title: title,
                    body: messageBody,
                    slideOutTime: 2000
                });
            }
            else {
                this.notificationRef.current?.show({
                    appTitle: 'Notification',
                    timeText: 'Now',
                    title: title,
                    body: messageBody,
                    slideOutTime: 2000
                });
            }
           
        }
        else console.error("No notificationPopUp ref set");
           
    }
}
const uiUtils = new UI();
export default uiUtils;
