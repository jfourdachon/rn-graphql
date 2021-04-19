import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';
import { AppRegistry } from 'react-native';
import { enableScreens } from 'react-native-screens';
import HomeScreen from './screens/HomeScreen';

const client = new ApolloClient({
  uri: 'http://192.168.1.47/graphql',
  cache: new InMemoryCache(),
});

enableScreens();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <HomeScreen />
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
