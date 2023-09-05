import React, {useState} from 'react'
import { ViewStyle, View, Pressable } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import { scale } from 'react-native-size-matters';
import { VisiblePassSvg } from '../svg/general';
import NotVisiblePassSvg from '../svg/general/NotVisiblePassSvg copy';
import SvgView from './SvgView';

interface Input {
    style?: ViewStyle,
    label?: string,
    selectionColor?: string,
    value?: string,
    onChangeText: Function,
}

const PasswordInput = ({ style, label, selectionColor, value, onChangeText} : Input) => {

    const theme = useTheme();

    const [passVisible, setPassVisible] = useState(false);

    const getStyle = () => {
        if(style !== undefined && style !== null)
        {
            return style;
        }
        else return {}
    }

    return(
        <View style={{position: 'relative', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <TextInput
            style={getStyle()}
            label={label !== undefined ? label : "No label provided"}
            selectionColor={selectionColor !== undefined ? selectionColor : theme.colors.tertiary}
            value={value}
            autoCapitalize={"none"}
            secureTextEntry={!passVisible}
            onChangeText={(text: string) => onChangeText(text)}
            />
            <View style={{position: "absolute", right: scale(30)}}>
            {
                passVisible === true ?
                (
                    <Pressable  onPress={() => setPassVisible(false)}>
                    <SvgView size="small">
                        <VisiblePassSvg></VisiblePassSvg>
                    </SvgView>
                    </Pressable>
                )
                :(
                    <Pressable  onPress={() => setPassVisible(true)}>
                    <SvgView size="small">
                        <NotVisiblePassSvg></NotVisiblePassSvg>
                    </SvgView>
                    </Pressable>
                )
               
            }
            </View>
        </View>
        

    );
}

export default PasswordInput;