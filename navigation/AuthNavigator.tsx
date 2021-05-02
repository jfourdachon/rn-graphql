import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AuthScreen from '../screens/AuthScreen';
import LandingScreen from '../screens/LandingScreen';

export type AuthStackParam = {
  Auth: undefined;
  Landing: undefined;
};

const AuthStackNavigator = createStackNavigator<AuthStackParam>();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator>
      <AuthStackNavigator.Screen
        name='Landing'
        component={LandingScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthStackNavigator.Screen name='Auth' component={AuthScreen} />
    </AuthStackNavigator.Navigator>
  );
};
