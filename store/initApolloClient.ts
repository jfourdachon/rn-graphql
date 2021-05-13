import { ApolloClient, createHttpLink, InMemoryCache, from, gql, NormalizedCacheObject, fromPromise } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import { setContext } from '@apollo/client/link/context';
import { API_URL, API_CREDENTIALS } from "@env";
import * as SecureStore from 'expo-secure-store';
import { cache, isLoggedInVar } from './cache'
import { REFRESH_TOKEN } from './auth/query'


const httpLink = createHttpLink({
    uri: API_URL,
});


const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    let token;
    try {
        token = await SecureStore.getItemAsync('token')
    } catch (error) { }
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});


// TODO separate links in multiple files

let isRefreshing = false
let pendingRequests: Function[] = []

const setIsRefreshing = (value: boolean) => {
    isRefreshing = value
}

const addPendingRequest = (pendingRequest: Function) => {
    pendingRequests.push(pendingRequest)
}

const renewTokenApiClient = new ApolloClient({
    link: createHttpLink({ uri: API_URL }),
    cache,
    credentials: 'include',
})

const resolvePendingRequests = () => {
    pendingRequests.map((callback) => callback())
    pendingRequests = []
}

const getNewToken = async () => {
    // const oldRenewalToken = localStorage.getItem('renewalToken')

    try {
        const { data } = await renewTokenApiClient.query({ query: REFRESH_TOKEN })
        if (data?.refreshToken?.token) {

            await SecureStore.setItemAsync('token', data.refreshToken.token)
            isLoggedInVar(true)
        }

    } catch (error) {
        console.log({ error })
    }

}


const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
            if (message === 'Unauthorized') {
                if (!isRefreshing) {
                    setIsRefreshing(true)

                    return fromPromise(
                        getNewToken().catch(async () => {
                            resolvePendingRequests()
                            setIsRefreshing(false)
                            // TODO logout
                            await SecureStore.deleteItemAsync('token')

                            return forward(operation)
                        }),
                    ).flatMap(() => {
                        resolvePendingRequests()
                        setIsRefreshing(false)
                        return forward(operation)
                    })
                } else {
                    return fromPromise(
                        new Promise<void>((resolve) => {
                            addPendingRequest(() => resolve())
                        }),
                    ).flatMap(() => {
                        return forward(operation)
                    })
                }
            }
        });
    }
})

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;



const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache,
    credentials: API_CREDENTIALS,
    typeDefs
});


export default client