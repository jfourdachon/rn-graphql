import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import client from '../store/initApolloClient';
import { isLoggedInVar } from '../store/cache';

interface User {
  _id: String;
  username: String;
  email: String;
}
interface Lessons {
  _id: String;
  name: String;
  startDate: String;
  endDate: String;
  users: User[];
}


const HomeScreen = () => {

  const onLogout = async () => {
    try {
      await SecureStore.deleteItemAsync('token');
      client.resetStore();
      isLoggedInVar(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.screen}>
      <Text>Hello world</Text>
      <Button title='Déconnexion' onPress={onLogout} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
