import { ApolloClient, createHttpLink, fromPromise } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import { API_URL } from "@env";
import * as SecureStore from 'expo-secure-store';
import { cache, isLoggedInVar, isLoggedOutVar } from './cache'
import { IS_LOGGED_OUT, REFRESH_TOKEN } from './auth/query'
import { LOGOUT } from './auth/mutations';



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
            isLoggedOutVar(false)
        } else {
            isLoggedInVar(false)
            isLoggedOutVar(true)
        }

    } catch (error) {
        console.log({ error })
    }

}


const isUserLoggedOut = async () => {
    try {
        const { data } = await renewTokenApiClient.query({ query: IS_LOGGED_OUT })

        return data === true
    } catch (error) {

    }
}


export const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message }) => {
            
            if (message === 'Unauthorized' && !isUserLoggedOut) {
                if (!isRefreshing) {
                    setIsRefreshing(true)

                    return fromPromise(
                        getNewToken().catch(async () => {
                            resolvePendingRequests()
                            setIsRefreshing(false)
                            await renewTokenApiClient.mutate({ mutation: LOGOUT })
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
