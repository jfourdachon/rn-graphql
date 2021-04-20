import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { API_URL, API_CREDENTIALS } from "@env";
import AsyncStorage from '@react-native-community/async-storage';


const httpLink = createHttpLink({
    uri: API_URL,
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = AsyncStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    credentials: API_CREDENTIALS
});


export default client