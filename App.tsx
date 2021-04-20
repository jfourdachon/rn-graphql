import React from 'react';
import { StyleSheet } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import { AppRegistry } from 'react-native';
import { enableScreens } from 'react-native-screens';
import AppNavigator from './navigation/AppNavigator';
import client from './store';


enableScreens();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppNavigator />
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent('MyApplication', () => App);
