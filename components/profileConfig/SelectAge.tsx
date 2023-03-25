import React, {useState, useEffect} from 'react'
import {View} from 'react-native'

import {Text, useTheme} from 'react-native-paper'
import { scale, verticalScale } from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';
import WheelPickerExpo from 'react-native-wheel-picker-expo';

import { PrimaryContainer } from '../general';

interface Input {
    onChange: Function
}

const SelectAge = ({onChange} : Input) => {
    const theme = useTheme();
    const minimumAge = 12;
    const maximumAge = 90;
    const ageValues = Array.from({length: maximumAge - minimumAge + 1}, (_, i) => { return {label: i + minimumAge, value: i + minimumAge}});
    const [selectedAge, setSelectedAge] = useState<number>(minimumAge);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
   const [items, setItems] = useState(Array.from({length: maximumAge - minimumAge + 1}, (_, i) => { return {label: (i + minimumAge).toString(), value: (i + minimumAge).toString()}}));

    useEffect(() => {
      onChange(value);
    }, [value])
    
    return(
        <PrimaryContainer styleInput={{backgroundColor: theme.colors.background, padding: scale(5)}}>
            <Text style={{margin: scale(5)}}>Select Age</Text>
                <DropDownPicker
                listMode='FLATLIST'
                style={{
                    width: scale(100)
                  }}
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
                />
             
        </PrimaryContainer>
    );
};

export default SelectAge;
