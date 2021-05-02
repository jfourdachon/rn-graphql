import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import HomeScreen from "../screens/HomeScreen"

export type MainStackParam = {
    Home: undefined
}
const MainStackNavigator = createStackNavigator<MainStackParam>()

export const MainNavigator = () => {
    return (
        <MainStackNavigator.Navigator>
            <MainStackNavigator.Screen name='Home' component={HomeScreen} />
        </MainStackNavigator.Navigator>
    )
}