import { gql, useQuery } from '@apollo/client';


const WHOAMI = gql`
 query WhoAmI {
  whoAmI {
    username
    email
    isPremium
  }
}
`;

export const GetAuthenticatedUser = () => {
    const { data, loading, error } = useQuery(WHOAMI)
    return {
        data, loading, error
    }
}