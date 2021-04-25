import { gql, useMutation } from '@apollo/client';


interface SignupData {
    _id: String
    email: String
    username: String
    isVegetarian: Boolean
}

interface SignUpDto {
    email: String
    username: String
    isVegetarian: Boolean
    password: String
}


const SIGNUP = gql`
  mutation saveRocket($signUpDto: SignUpDto!) {
    signup(signUpDto: $signUpDto) {
      username
    }
  }
`;


export const useSignup = () => {
    const [signup, { loading }] = useMutation<{ signup: SignupData }, { signUpDto: SignUpDto }>(SIGNUP);
    return async (variables: SignUpDto) => {
        try {
            const {
                email,
                username,
                password,
                isVegetarian
            } = variables
            const { data } = await signup({
                variables: {
                    signUpDto: {
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


interface LoginData {
    _id: String
    email: String
    username: String
    isVegetarian: Boolean
}

interface LoginDto {
    email: String
    password: String
}


const LOGIN = gql`
  mutation saveRocket($signUpDto: LoginDto!) {
    signup(signUpDto: $signUpDto) {
      username
    }
  }
`;


export const useLogin = () => {
    const [login, { loading }] = useMutation<{ login: LoginData }, { loginDto: LoginDto }>(LOGIN);
    return async (variables: SignUpDto) => {
        try {
            const {
                email,
                password,
            } = variables
            const { data } = await login({
                variables: {
                    loginDto: {
                        email,
                        password,
                    }
                }
            })
            return { data, loading }
        } catch (error) {
            throw new Error(error)
        }
    }
}
