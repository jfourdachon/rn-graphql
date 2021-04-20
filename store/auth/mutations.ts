import { gql, useMutation } from '@apollo/client';


const SIGNUP = gql`
    mutation Signup($email: String!, $username: String!, $password: String!, $isVegetarian: Boolean) {
        signup(createUserDto: {email: $email, username: $username, password: $password, isVegetarian: $isVegetarian}) {
            email
            username
        }
    }
`;

export const useSignup = () => {
    const [signup] = useMutation(SIGNUP);
    return async (email: string, username: string, password: string, isVegetarian: boolean ) => {
        try {
            
     
        const [data, loading] = await signup({
            variables: {
                createUserDto: {
                    email,
                    username,
                    password, 
                    isVegetarian
                }
            }
        })
        return {data, loading}
    } catch (error) {
            throw new Error(error)
    }
    }
}
