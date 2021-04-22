import { gql, useMutation } from '@apollo/client';





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

interface CreateUserDto {
    email: String
    username: String
    isVegetarian: Boolean
    password: String
}


const SIGNUP = gql`
  mutation saveRocket($createUserDto: CreateUserDto!) {
    signup(createUserDto: $createUserDto) {
      username
    }
  }
`;


export const useSignup = () => {
    const [signup, { loading }] = useMutation<{ signup: SignupData }, { createUserDto: CreateUserDto }>(SIGNUP);
    return async (variables: CreateUserDto) => {
        try {
            const {
                email,
                username,
                password,
                isVegetarian
            } = variables
            //TODO https://www.apollographql.com/docs/react/development-testing/static-typing/
            const { data } = await signup({
                variables: {
                    createUserDto: {
                        email,
                        username,
                        password,
                        isVegetarian
                    }
                }
            })
            return { data, loading }
        } catch (error) {
            throw new Error(error)
        }
    }
}
