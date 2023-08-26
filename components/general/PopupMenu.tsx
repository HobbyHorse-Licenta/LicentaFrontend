import React, {useRef} from 'react'
import {View} from 'react-native'

import {Appbar, Divider, Menu } from 'react-native-paper'
import uuid from 'react-native-uuid'
import {scale} from 'react-native-size-matters'

export type MenuItems = {
    text: string,
    function: Function
}
interface PopupMenuInput {
    buttonStyle?: any,
    items: Array<MenuItems>
}

const PopupMenu = ({items, buttonStyle} : PopupMenuInput) => {
    const [visible, setVisibility] = React.useState(false);
    const [buttonPosition, setButtonPosition] = React.useState({x: 0, y: 0});
    const buttonRef = useRef<View>(null);
   
    const handleLayout = () => {
        if(buttonRef.current !== null)
        {
            buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
                setButtonPosition({x: pageX, y: pageY})
              });
        }
      
      };
    const getButtonStyle = () => {
        if(buttonStyle !== undefined && buttonStyle !== null)
        {
            return buttonStyle;
        }
        else return {position: 'absolute', right: scale(15)}
    }

    return(
        <View style={getButtonStyle()}>
        <Appbar.Action ref={buttonRef} icon="dots-vertical" onPress={() => setVisibility(true)} onLayout={handleLayout}/>
        <Menu
        visible={visible}
        onDismiss={() => setVisibility(false)}
        anchor={{x: buttonPosition.x + scale(20), y: buttonPosition.y + scale(30)}}
        anchorPosition={"top"}
        >
        {
            items.map((item, index) => {
                return(
                    <View key={uuid.v4().toString()}>
                        {index !== 0 &&  <Divider />}
                        <Menu.Item onPress={() => {item.function(); setVisibility(false);}} title={item.text} />
                    </View>
                );
            })
        }
        </Menu>
        </View>
    );
}

export default PopupMenu;