import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const RecipeScreen = () => {
    return (
        <View style={styles.screen}>
            <Text>Ici la liste des recettes</Text>
        </View>
    )
}

export default RecipeScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
      },
})
