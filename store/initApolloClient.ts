import { ApolloClient, createHttpLink, InMemoryCache, from, gql, NormalizedCacheObject } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import { setContext } from '@apollo/client/link/context';
import { persistCache, AsyncStorageWrapper } from 'apollo3-cache-persist';
import { API_URL, API_CREDENTIALS } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cache } from './cache'



const httpLink = createHttpLink({
    uri: API_URL,
});


const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    let token;
    try {
        token = await AsyncStorage.getItem('token')
    } catch (error) { }
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const resetToken = onError(({ networkError, graphQLErrors }) => {

    if (
        graphQLErrors && graphQLErrors[0].message === 'Unauthorized'
    ) {
        // remove cached token on 401 from the server
        //TODO handle refreshToken here
    }
});


const authFlowLink = authLink.concat(resetToken);

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
        );

    if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

// export const waitOnCache = persistCache({
//     cache,
//     storage: AsyncStorage
// })


const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    link: from([errorLink, authFlowLink, httpLink]),
    cache,
    credentials: API_CREDENTIALS,
    typeDefs
});


export default client