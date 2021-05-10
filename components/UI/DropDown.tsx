import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet, Text, View } from 'react-native';

export interface Item {
  label: string;
  value: any;
}

interface Props {
  items: Item[];
  onValueChange: (e: string) => void;
  value: number;
  placeholder: Item;
}

const DropDown = ({ items, onValueChange, value, placeholder }: Props) => {
  return (
    <RNPickerSelect
      useNativeAndroidPickerStyle={false}
      style={{ ...pickerSelectStyles }}
      onValueChange={(e) => onValueChange(e)}
      value={value}
      items={items}
      placeholder={placeholder}
    />
  );
};

export default DropDown;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: 80,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    width: 80,

    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
});
