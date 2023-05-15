import React, { useState, useEffect, useRef } from 'react';
import {View, StyleSheet, Platform} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import { scale } from 'react-native-size-matters';
import {useTheme} from 'react-native-paper'
import { wrap } from 'module';


interface Input {
    onChange: (numberOfPeople: number) => void
}

const SelectNumberOfPeople = ({onChange} : Input) => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<number | null>(null);
    const [items, setItems] = useState(Array.from({length: 5}, (_, i) => { return {label: (i + 1).toString(), value: (i + 1)}}));

 
    const theme = useTheme();

    useEffect(() => {
        if(value !== null)
            onChange(value);
    }, [value])

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
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            zIndex={5}
            autoScroll={true}
            />
    );
};

export default SelectNumberOfPeople;
