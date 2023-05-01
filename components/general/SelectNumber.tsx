import React, {useState, useEffect} from 'react'
import {View} from 'react-native'

import {Text, useTheme} from 'react-native-paper'
import { scale } from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';

import PrimaryContainer from '../general/PrimaryContainer';

interface SelectNumberInput {
    range: {minimumValue: number, maximumValue: number},
    descriptionText: string,
    value: number,
    onChange: Function,
}
const SelectNumber = ({range, descriptionText, value, onChange} : SelectNumberInput) => {

    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(Array.from({length: range.maximumValue - range.minimumValue + 1}, (_, i) => { return {label: (i + range.minimumValue).toString(), value: (i + range.minimumValue)}}));

    const getCurrentItem = () =>
    {
        if(items.find(item => item.value === value) !== undefined)
        {
            return value;
        } 
        else{
            return range.minimumValue;
        }
    }

    return(
        <PrimaryContainer  styleInput={{width: scale(140), padding: scale(9)}}>
            <Text style={{margin: scale(3)}}>{descriptionText}</Text>
            <DropDownPicker
            listMode='MODAL'
            style={{
                margin: scale(3)
            }}
            textStyle={{
                fontSize: scale(14),
            }}
            labelStyle={{
                fontWeight: "bold",
                color: theme.colors.tertiary
            }}
            open={open}
            value={getCurrentItem()}
            items={items}
            setOpen={setOpen}
            setValue={(value) => {onChange(value);}}
            setItems={setItems}
            />
        </PrimaryContainer>
    );
} 

export default SelectNumber;