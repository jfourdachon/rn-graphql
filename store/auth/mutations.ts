import { gql, useMutation } from '@apollo/client';


interface SignupData {
    _id: String
    email: String
    username: String
    isVegetarian: Boolean
}

interface SignupDto {
    email: String
    username: String
    isVegetarian: Boolean
    password: String,
}


const SIGNUP = gql`
  mutation Signup($signupDto: SignupDto!) {
    signup(signupDto: $signupDto) {
      username
    }
  }
`;


export const useSignup = () => {
    const [signup] = useMutation(SIGNUP);
    return async (variables: SignupDto) => {
        try {
            console.log({ variables })
            const {
                email,
                username,
                password,
                isVegetarian
            } = variables
  

            const { data, } = await signup({
                variables: {
                    signupDto: {
                        email,
                        username,
                        password,
                        isVegetarian
                    }
                },
            })
            return { data }
        } catch (error) {
            return {
                error
            }
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
    const [login] = useMutation<{ login: LoginData }, { loginDto: LoginDto }>(LOGIN);
    return async (variables: LoginDto) => {
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
            return { data }
        } catch (error) {
            return { error }
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
    mutation ResetPasswordRequest($resetPasswordRequestDto: ResetPasswordRequestDto!) {
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