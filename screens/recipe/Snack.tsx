import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const SnackScreen = () => {
    return (
        <View style={styles.screen}>
            <Text>Ici la liste des recettes d' encas</Text>
        </View>
    )
}

export default SnackScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
      },
})
