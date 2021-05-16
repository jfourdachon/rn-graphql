import { gql, useQuery } from '@apollo/client';


const WHOAMI = gql`
 query WhoAmI {
  whoAmI {
    username
    email
  }
}
`;

export const GetAuthenticatedUser = () => {
    try {
        const { data, loading, error } = useQuery(WHOAMI)
        return {
            data, loading, error
        }
    } catch (error) {
        throw new Error(error)
    }
}


interface IsLoggedIn {
    isLoggedIn: boolean
}


export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const IsLoggedIn = () => {
    const { data } = useQuery<IsLoggedIn>(IS_LOGGED_IN);
    return {
        data
    }
}

interface IsLoggedOut {
    isLoggedOut: boolean
}

export const IS_LOGGED_OUT = gql`
  query IsLoggedOut {
    isLoggedOut @client
  }
`;
export const IsLoggedOut = () => {
    const { data } = useQuery<IsLoggedOut>(IS_LOGGED_OUT);
    return {
        isLoggedOut: data
    }
}


export const REFRESH_TOKEN = gql`
    query RefreshToken {
        refreshToken {
            token
        }
    }
`;
