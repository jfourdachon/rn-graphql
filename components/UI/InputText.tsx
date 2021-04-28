import React from 'react'
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'

interface Props {
    style?: {}
    placeholder: string
    onChangeText: (e: any) => void
    value: string
    onBlur: (e: any) => void
}

const InputText = ({style, placeholder, onChangeText, onBlur, value}: Props) => {
    return (
       <TextInput style={[styles.input, style]}
       placeholder={placeholder}
       onChangeText={onChangeText}
       value={value}
       onBlur={onBlur}/>
    )
}

export default InputText

const styles = StyleSheet.create({
    input: {
        height: 40,
        paddingHorizontal: 5,
        width: Dimensions.get('window').width / 2,
        backgroundColor: '#ece7e7',
        marginVertical: 10,
      },
})
