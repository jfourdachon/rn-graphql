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
    const { data, loading, error } = useQuery(WHOAMI)
    return {
        data, loading, error
    }
}


interface IsLoggedIn {
    isLoggedIn: boolean;
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