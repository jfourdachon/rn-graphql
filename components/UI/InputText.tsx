import React from 'react'
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import { KeyboardType } from '../../typescript/enums/form'

interface Props {
    style?: {}
    placeholder: string
    onChangeText: (e: any) => void
    value: string
    onBlur?: (e: any) => void
    keyboardType?: KeyboardType
}

const InputText = ({style, placeholder, onChangeText, onBlur, value, keyboardType}: Props) => {
    return (
       <TextInput style={[styles.input, style]}
       placeholder={placeholder}
       onChangeText={onChangeText}
       value={value}
       onBlur={onBlur}
       keyboardType={keyboardType}
       />
    )
}

export default InputText

const styles = StyleSheet.create({
    input: {
        height: 40,
        paddingHorizontal: 5,
        backgroundColor: '#ece7e7',
        marginVertical: 10,
      },
})
