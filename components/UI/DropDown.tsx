import React from 'react'
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet, Text, View } from 'react-native'

const DropDown = () => {
    return (
        <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Football', value: 'football' },
                { label: 'Baseball', value: 'baseball' },
                { label: 'Hockey', value: 'hockey' },
            ]}
        />
    )
}

export default DropDown

const styles = StyleSheet.create({})
