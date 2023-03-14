import React from 'react'

import { useTheme } from 'react-native-paper';
import { scale } from 'react-native-size-matters';


import {ChatSvg} from '../../svg/general';
import { AppHeader, SvgView } from '../../general';

const HeaderChatIcon = () => {

    const theme = useTheme();
    
    return(
        <AppHeader>
             <SvgView onTouchEnd={() => console.log("Chat")} style={{position: 'absolute', right: scale(5), backgroundColor: theme.colors.primary}}>
                <ChatSvg></ChatSvg>
             </SvgView>
        </AppHeader>
    );
};

export default HeaderChatIcon;

