import { getStatusBarHeight } from 'react-native-status-bar-height';
import {Dimensions} from 'react-native'
import { verticalScale } from 'react-native-size-matters';

const screenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;

const SizeUtil = {

    getDefaultNotificationBarSize: function(){
        const statusBarSize = getStatusBarHeight();
        return statusBarSize;
    },

    getDefaultNavigationBarSize: function(){
        const barSize = SizeUtil.getDefaultNotificationBarSize();
        let navBarSize = screenHeight - (windowHeight + barSize);
        if(navBarSize < 0)
        {
          navBarSize = 0;
        }
        return navBarSize;
    },

    getWindowSize: function(){
        const barSize = SizeUtil.getDefaultNotificationBarSize();
        const navBarSize = SizeUtil.getDefaultNavigationBarSize();

        const bodySize = screenHeight - barSize - navBarSize;
        return bodySize;
    }
};

export default SizeUtil;