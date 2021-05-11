import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const BreakfastScreen = () => {
    return (
        <View style={styles.screen}>
            <Text>Ici la liste des petits dejs</Text>
        </View>
    )
}

export default BreakfastScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
})
