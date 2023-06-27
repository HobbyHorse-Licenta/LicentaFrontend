import React, { useState} from 'react';

import DropDownPicker from 'react-native-dropdown-picker';
import { scale } from 'react-native-size-matters';
import {useTheme} from 'react-native-paper'


interface Input {
    inputValue: number | null
    onChange: React.Dispatch<React.SetStateAction<number | undefined>>
}

const SelectNumberOfPeople = ({onChange, inputValue} : Input) => {

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(Array.from({length: 5}, (_, i) => { return {label: (i + 1).toString(), value: (i + 1)}}));

 
    const theme = useTheme();

    return(
            <DropDownPicker
            listMode='SCROLLVIEW'
            placeholder='Select a number'
            containerStyle={{width: scale(130)}}
            textStyle={{
            fontSize: scale(14),
            }}
            labelStyle={{
            fontWeight: "bold",
            color: theme.colors.tertiary,
            }}
            dropDownContainerStyle = {{
                flexWrap: 'nowrap'
            }}
            open={open}
            value={inputValue}
            items={items}
            setOpen={setOpen}
            setValue={onChange}
            setItems={setItems}
            zIndex={5}
            autoScroll={true}
            />
    );
};

export default SelectNumberOfPeople;
