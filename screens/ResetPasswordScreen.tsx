import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ResetPasswordForm from '../components/forms/ResetPasswordForm' 

const ResetPasswordScreen = () => {
    return (
        <View style={styles.screen}>
            <ResetPasswordForm />
        </View>
    )
}

export default ResetPasswordScreen

const styles = StyleSheet.create({
    screen: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
