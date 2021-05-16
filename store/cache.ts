import { InMemoryCache, makeVar } from '@apollo/client';


export const isLoggedInVar = makeVar(false);
export const isLoggedOutVar = makeVar(false);



export const cache: InMemoryCache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                isLoggedOut: {
                    read() {
                        return isLoggedOutVar();
                    }
                },
                isLoggedIn: {
                    read() {
                        return isLoggedInVar();
                    }
                },

            }
        }
    }
});