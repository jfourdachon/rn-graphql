import 'react-native-gesture-handler';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
  useLinking,
} from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';
import { GetAuthenticatedUser, IsLoggedIn } from '../store/auth/query';
import { gql } from '@apollo/client';
import { isLoggedInVar } from '../store/cache';
import { ActivityIndicator, View } from 'react-native';

const prefix = Linking.makeUrl('/');

const AppNavigator = () => {
  const ref = useRef(null);
    const {loading, data: loadAuthenticatedUser, error} = GetAuthenticatedUser()
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

      setIsReady(true);
    };
    getState();
  }, [getInitialState]);


  
  useEffect(() => {
      if(loadAuthenticatedUser) {
        isLoggedInVar(true)
      }
  })

  if (!isReady) {
    return null;
  }
  console.log({data})

  if(loading) return (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  <ActivityIndicator />
  </View>
  )

  return (
    <NavigationContainer initialState={initialState} ref={ref}>
      {data?.isLoggedIn ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
