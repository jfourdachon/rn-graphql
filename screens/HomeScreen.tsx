import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import client from '../store/initApolloClient';
import { isLoggedInVar } from '../store/cache';

//TODO put apollo stuff in a store folder

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

// const GET_LESSONS = gql`
//  query Lessons {
//   lessons {
//     _id
//     name
//     startDate
//     endDate
//     users {
//       _id
//       username
//       email
//     }
//   }
// }
// `;

// const GetAllLessons = () => {
//     const {loading, error, data} = useQuery<Lessons>(GET_LESSONS);

//     if(error) {
//         console.log({error})
//         throw new Error(error.message)
//     }

//     return {
//         loading,
//         data,
//     }
// }

const HomeScreen = () => {
  // const { loading, data } = GetAllLessons()

  // if (loading) console.log('loading...')
  // if(data) {
  //   console.log(data)
  // }

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
