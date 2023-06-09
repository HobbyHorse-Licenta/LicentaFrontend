import React from 'react'

import { Appbar} from 'react-native-paper';

const AppHeader = ({children}) => {


    return(
        <Appbar.Header style={{justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', position: 'relative'}}  statusBarHeight={0}>
            {children}
        </Appbar.Header>
    );
};

export default AppHeader;