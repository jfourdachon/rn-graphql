import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AuthScreen from '../screens/AuthScreen';
import LandingScreen from '../screens/LandingScreen';
import ResetPasswordForm from '../components/forms/ResetPasswordForm';

export type AuthStackParam = {
  Auth: { shouldLogin?: boolean };
  Landing: undefined;
  ResetPassword: undefined
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
      <AuthStackNavigator.Screen name='ResetPassword' component={ResetPasswordForm} />
    </AuthStackNavigator.Navigator>
  );
};
