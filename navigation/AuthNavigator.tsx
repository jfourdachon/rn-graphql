import React, {RefObject, useRef} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainerRef, useLinking } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';


export type AuthStackParam = {
    Auth: undefined
    ResetPassword: undefined
};


const prefix = Linking.makeUrl("/");


const AuthStackNavigator = createStackNavigator<AuthStackParam>()


export const AuthNavigator = () => {

    return (
        <AuthStackNavigator.Navigator>
            <AuthStackNavigator.Screen name="Auth" component={AuthScreen} />
            <AuthStackNavigator.Screen name="ResetPassword" component={ResetPasswordScreen} />
        </AuthStackNavigator.Navigator>
    )
}

