import React from 'react';
import NotificationPopup from 'react-native-push-notification-popup';

class UI {
    notificationRef: React.RefObject<NotificationPopup | null>;
 
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
