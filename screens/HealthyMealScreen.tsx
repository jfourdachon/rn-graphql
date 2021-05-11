import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const HealthyMealScreen = () => {
    return (
        <View style={styles.screen}>
            <Text>Ici l'assiette santé</Text>
        </View>
    )
}

export default HealthyMealScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
      },
})
