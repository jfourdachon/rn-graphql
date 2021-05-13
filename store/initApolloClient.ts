import { ApolloClient, from, NormalizedCacheObject } from '@apollo/client';
import { API_CREDENTIALS } from "react-native-dotenv";
import { cache } from './cache'
import {errorLink} from './errorLink'
import {authLink} from './autLink'
import {httpLink} from './httpLink'
import {typeDefs} from './typeDefs'



const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache,
    credentials: API_CREDENTIALS,
    typeDefs
});


export default client