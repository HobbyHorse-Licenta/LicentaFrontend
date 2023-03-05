import React from 'react';

import { SafeAreaView } from 'react-navigation';
import { useSelector } from 'react-redux';

interface Params{
    body: any
}

const Layout1Piece = ({body} : Params) => {
    
    const {windowHeight} = useSelector((state: any) => state.ui)
   
    return (
        <SafeAreaView style={{width: '100%', height: windowHeight, display: 'flex'}}>
            {body}
        </SafeAreaView>
    );
};

export default Layout1Piece;
