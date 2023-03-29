import React, { useState, useEffect, useRef } from 'react';
import {View, StyleSheet, Platform} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import { scale } from 'react-native-size-matters';
import {useTheme} from 'react-native-paper'


interface Input {
    onMinimumAgeChange: Function,
    onMaximumAgeChange: Function,
}

const SelectAgeGap = ({onMinimumAgeChange, onMaximumAgeChange} : Input) => {

    const minimumAge = 12;
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | null>(null);
    const [items, setItems] = useState(Array.from({length: 80}, (_, i) => { return {label: (i + minimumAge).toString(), value: (i + minimumAge).toString()}}));

    const [open2, setOpen2] = useState(false);
    const [value2, setValue2] = useState<string | null>(null);
    const [items2, setItems2] = useState(Array.from({length: 80}, (_, i) => { return {label: (i + minimumAge).toString(), value: (i + minimumAge).toString()}}));
 
    const theme = useTheme();

    useEffect(() => {
        onMinimumAgeChange(value);
    }, [value])

    useEffect(() => {
        onMaximumAgeChange(value);
    }, [value2])
  
    return(
        <View style={{flexDirection: 'row'}}>
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
            onChangeValue={(val1) => {
                if(val1 !== null && value2 !== null && value2 < val1)
                    setValue2(val1);
            }}
            zIndex={3}
            autoScroll={true}
            />
            <DropDownPicker
            zIndex={3}
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
                autoScroll={true}
            open={open2}
            value={value2}
            items={items2}
            setOpen={setOpen2}
            setValue={setValue2}
            onChangeValue={(val2) => {
                if(val2 != null)
                {
                    if(value !== null)
                    {
                        if(val2 < value)
                        {
                            setValue2(value);
                        }
                        else setValue2(val2)
                    }
                    else setValue2(val2);
                }
            }}
            setItems={setItems2}
            />
        </View>
       
      
    );
};

export default SelectAgeGap;
