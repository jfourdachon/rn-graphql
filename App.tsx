import React from 'react';
import { StyleSheet } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import { AppRegistry } from 'react-native';
import { enableScreens } from 'react-native-screens';
import AppNavigator from './navigation/AppNavigator';
import client from './store/initApolloClient';
import { SafeAreaProvider } from 'react-native-safe-area-context';

enableScreens();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent('MyApplication', () => App);
