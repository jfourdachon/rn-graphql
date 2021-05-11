import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const MealScreen = () => {
    return (
        <View style={styles.screen}>
            <Text>Ici la liste des recettes de repas</Text>
        </View>
    )
}

export default MealScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
      },
})
