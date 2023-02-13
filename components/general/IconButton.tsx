import React, {FC} from 'react'
import { TouchableOpacity, Image } from 'react-native';

interface Params {
    path: string
}
const IconButton: FC<Params> = ({path}) => {

    return(
        <TouchableOpacity activeOpacity={0.5}>
            <Image style={{height: '100%', width: '100%'}} source={require(path)}/>
        </TouchableOpacity>
    );
};

export default IconButton;