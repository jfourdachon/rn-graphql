import { ApolloClient, createHttpLink, InMemoryCache,from } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import { setContext } from '@apollo/client/link/context';
import { API_URL, API_CREDENTIALS } from "@env";
import * as SecureStore from 'expo-secure-store';



const httpLink = createHttpLink({
    uri: API_URL,
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    let token;
    try {
        token = SecureStore.getItemAsync('token')
    } catch (error) {}
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
      const token = SecureStore.getItemAsync('token')
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

const client = new ApolloClient({
    link: from([errorLink, authFlowLink, httpLink]),
    cache: new InMemoryCache(),
    credentials: API_CREDENTIALS
});


export default client