import React, {ReactNode} from "react";
import { Pressable, ScrollView } from "react-native";


import { GeneralModal } from "../general";

interface ModalInput {
    visible: boolean,
    onDismiss: Function,
    onSelect: Function,
    list: Array<ReactNode>
}

const SelectionListModal = ({visible, onDismiss, onSelect, list} : ModalInput) => {

  
    
    const getOptions = () => {
        return list.map((listElement, index) => {
            return(
                <Pressable key={index} onPress={() => onSelect(listElement)}>
                    {listElement}
                </Pressable>
            );
        })
    };
    

    return(
        <GeneralModal visible={visible} onDismiss={() => onDismiss()}>
            <ScrollView>
              { getOptions() }
            </ScrollView>
        </GeneralModal>
    );
};

export default SelectionListModal;