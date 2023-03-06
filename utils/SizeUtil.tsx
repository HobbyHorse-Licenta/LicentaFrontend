
import {Dimensions} from 'react-native';


const screenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;

const SizeUtil = {


    // getWindowSize: function(){
    //     const navigationBarSize = SizeUtil.getDefaultStatusBarSize();
    //     const statusBarSize = SizeUtil.getDefaultNavigationBarSize();

    //     const bodySize = screenHeight - navigationBarSize - statusBarSize;
    //     return bodySize;
    // },

    // getWindowSizeWithoutBottomNavigator: function(){
    //     return SizeUtil.getWindowSize() - SizeUtil.getDefaultNavigationBarSize();
    // }

};

export default SizeUtil;