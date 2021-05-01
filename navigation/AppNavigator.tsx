import 'react-native-gesture-handler';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { NavigationContainer, NavigationContainerRef, useLinking } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { AuthNavigator } from './AuthNavigator';

const prefix = Linking.makeUrl('/');

const AppNavigator = () => {
  const ref = useRef(null);

  const { getInitialState } = useLinking(ref, {
    prefixes: [prefix],
    config: {
      screens: {
        ResetPassword: 'resetpassword/:email/:code',
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
    getState()
  }, [getInitialState]);

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer initialState={initialState} ref={ref}>
      <AuthNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
