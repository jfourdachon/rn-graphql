import { gql, useMutation } from '@apollo/client';


const SIGNUP = gql`
    mutation Signup($email: String!, $username: String!, $password: String!, $isVegetarian: Boolean) {
        signup(createUserDto: {email: $email, username: $username, password: $password, isVegetarian: $isVegetarian}) {
            email
            username
        }
    }
`;


interface SignupValues {
    email: String
    username: String
    isVegetarian: Boolean
    password: String
}


interface SignupData {
    _id: String
    email: String
    username: String
    isVegetarian: Boolean
}


export const useSignup = () => {
    const [signup, {loading}] = useMutation<{signup: SignupData}, {createUserDto: SignupValues}>(SIGNUP);
    return async (email: string, password: string, username: string, isVegetarian: boolean ) => {
        try {
            
     //TODO https://www.apollographql.com/docs/react/development-testing/static-typing/
        const {data} = await signup({
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
