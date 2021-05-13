import { createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { API_URL } from "react-native-dotenv";
import * as SecureStore from 'expo-secure-store';

export const authLink = setContext(async (_, { headers }) => {
    let token;
    try {
        token = await SecureStore.getItemAsync('token')
    } catch (error) { }
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});
