import React, { useState, useEffect, useRef } from 'react';
import {View, StyleSheet, Platform} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import { scale } from 'react-native-size-matters';
import {useTheme} from 'react-native-paper'


interface Input {
    onChange: Function
}

const SelectNumberOfPeople = ({onChange} : Input) => {

    const minimumAge = 12;
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | null>(null);
    const [items, setItems] = useState(Array.from({length: 5}, (_, i) => { return {label: (i + 1).toString(), value: (i + 1).toString()}}));

 
    const theme = useTheme();

    useEffect(() => {
        onChange(value);
    }, [value])

    return(
            <DropDownPicker
            listMode='SCROLLVIEW'
            style={{
                width: scale(100)
                }}
                containerStyle={{width: scale(100)}}
                textStyle={{
                fontSize: scale(14),
                }}
                labelStyle={{
                fontWeight: "bold",
                color: theme.colors.tertiary
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
