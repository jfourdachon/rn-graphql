import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';


export type AuthStackParam = {
    Auth: undefined
    Home: undefined
};


const AuthStackNavigator = createStackNavigator<AuthStackParam>()


export const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator>
            <AuthStackNavigator.Screen name="Auth" component={AuthScreen} />
            <AuthStackNavigator.Screen name="Home" component={HomeScreen} />
        </AuthStackNavigator.Navigator>
    )
}

