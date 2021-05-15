import { ApolloClient, createHttpLink, fromPromise } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import { API_URL } from "@env";
import * as SecureStore from 'expo-secure-store';
import { cache, isLoggedInVar } from './cache'
import { REFRESH_TOKEN } from './auth/query'


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
        } else {
            isLoggedInVar(false)
        }

    } catch (error) {
        console.log({ error })
    }

}


export const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message }) => {
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
