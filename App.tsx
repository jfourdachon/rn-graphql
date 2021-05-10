import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import { AppRegistry } from 'react-native';
import { enableScreens } from 'react-native-screens';
import AppNavigator from './navigation/AppNavigator';
import client from './store/initApolloClient';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

enableScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    'fira': require('./assets/fonts/FiraSans-Regular.otf'),
    'fira-medium': require('./assets/fonts/FiraSans-Medium.otf'),
    'fira-light': require('./assets/fonts/FiraSans-Light.otf'),
    'fira-bold': require('./assets/fonts/FiraSans-Bold.otf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(error) => console.log({ error })}
      />
    );
  }

  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent('MyApplication', () => App);
