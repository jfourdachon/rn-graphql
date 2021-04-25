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
  mutation Signup($signUpDto: SignUpDto!) {
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
  mutation Login($loginDto: LoginDto!) {
    login(loginDto: $loginDto) {
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


interface ResetPasswordRequestData {
    isRequestAccepted: Boolean
}

interface ResetPasswordRequestDto {
    email: String
}

const FORGOT_PASSWORD_REQUEST = gql`
    mutation ResetPasswordRequest($resetPasswordRequestDto, ResetPasswordRequestDto!) {
        resetPasswordRequest(resetPasswordRequestDto: $resetPasswordRequestDto) {
            isRequestAccepted
        }
    }
`;


export const useResetPasswordRequest = () => {
    const [forgotPasswordRequest] = useMutation<{ data: ResetPasswordRequestData }, { resetPasswordRequestDto: ResetPasswordRequestDto }>(FORGOT_PASSWORD_REQUEST)
    return async (variables: ResetPasswordRequestDto) => {
        try {
            const { email } = variables
            const { data } = await forgotPasswordRequest({
                variables: {
                    resetPasswordRequestDto: { email }
                }
            })
            return { data }
        }
        catch (error) {
            throw new Error(error)
        }
    }
}