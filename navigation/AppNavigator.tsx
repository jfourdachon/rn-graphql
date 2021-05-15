import 'react-native-gesture-handler';
import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer, useLinking } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as Linking from 'expo-linking';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';
import { GetAuthenticatedUser, IsLoggedIn } from '../store/auth/query';
import { isLoggedInVar } from '../store/cache';
import { ActivityIndicator, View } from 'react-native';
import SplashScreen from '../screens/SplashScreen';
import * as SecureStore from 'expo-secure-store';

const prefix = Linking.makeUrl('/');

const AppNavigator = () => {
  const ref = useRef(null);
  //TODO check if token before to avoid unauthorized error
  const {
    loading,
    data: loadAuthenticatedUser,
    error,
  } = GetAuthenticatedUser();
  const { data } = IsLoggedIn();

  const { getInitialState } = useLinking(ref, {
    prefixes: [prefix],
    config: {
      screens: {
        AuthScreen: 'auth',
        NotFound: '*',
      },
    },
  });

  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState<any>();

  useEffect(() => {
    const getState = async () => {
      const state = await getInitialState();
      if (state !== undefined) {
        setInitialState(state);
      }
    };
    getState();
  }, [getInitialState]);

  useEffect(() => {
    // TODO add verif if don't come from logout button
    if (loadAuthenticatedUser) {
      isLoggedInVar(true);
    }
  });

  useEffect(() => {
    const tester = async () => {
      const test = await SecureStore.getItemAsync('token');
      console.log(test);
    };
    tester();
  }, []);

  if (!isReady) {
    return <SplashScreen onAnimationFinish={() => setIsReady(true)} />;
  }

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  return (
    <SafeAreaProvider>
      <NavigationContainer initialState={initialState} ref={ref}>
        <SafeAreaView style={{ flex: 1 }}>
          {data?.isLoggedIn ? <MainNavigator /> : <AuthNavigator />}
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;
