import React from "react";
import { ScrollView, View } from "react-native";

import { scale } from "react-native-size-matters";

import { RenderElement } from "../../types";


import GeneralModal from "./GeneralModal";

interface ModalInput {
    visible: boolean,
    list: Array<RenderElement> | undefined
}

const SelectionListModal = ({visible, list} : ModalInput) => {


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