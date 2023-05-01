import React, {ReactNode} from "react";
import { Pressable, ScrollView, View } from "react-native";

import { Text } from "react-native-paper";
import { scale } from "react-native-size-matters";
import { RenderElement } from "../../types";


import GeneralModal from "./GeneralModal";

interface ModalInput {
    visible: boolean,
   // onDismiss: Function,
   // onSelect: Function,
    list: Array<RenderElement> | undefined
}

const SelectionListModal = ({visible, list} : ModalInput) => {

  
    
    const getOptions = () => {
        // if(list === undefined)
        // {
        //     return(<View><Text>No items</Text></View>)
        // }
        // else{
        //     return list.map((listElement, index) => {
        //         return(
        //             <Pressable key={index} onPress={() => onSelect(listElement)}>
        //                 {listElement}
        //             </Pressable>
        //         );
        //     })
        // }

        console.log(JSON.stringify(list));

        return(<View><Text>No items</Text></View>)
        
    };
    

    return(
        <GeneralModal visible={visible}>
            <View style={{width: scale(170), height: scale(200)}}>
            <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center'}} >
              { list !== undefined && list.map(renderElement => renderElement.element) }
            </ScrollView>
            </View>
            
        </GeneralModal>
    );
};

export default SelectionListModal;