import { InMemoryCache, makeVar } from '@apollo/client';


export const isLoggedInVar = makeVar(false);
export const didTryToLoginVar = makeVar(false);



export const cache: InMemoryCache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                didTryToLogin: {
                    read() {
                        return didTryToLoginVar();
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