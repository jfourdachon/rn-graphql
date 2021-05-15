import { gql, useMutation } from '@apollo/client';
import * as SecureStore from 'expo-secure-store';
import { DIET, OBJECTIVES, SignUpInfos } from '../../components/forms/signupFlow/types';
import { isLoggedInVar } from '../cache';
import { IsLoggedIn } from './query';


interface SignupData {
    token: string
}

interface SignupDto {
    email: String
    username: String
    password: String
    diet: DIET | null
    objective: OBJECTIVES | null
    height: number
    weight: number
}


const SIGNUP = gql`
  mutation Signup($signupDto: SignupDto!) {
    signup(signupDto: $signupDto) {
      token
    }
  }
`;


export const useSignup = () => {
    const [signup] = useMutation<{ signup: SignupData }, { signupDto: SignupDto }>(SIGNUP, {
        async onCompleted({ signup }) {
            if (signup) {
                await SecureStore.setItemAsync('token', signup.token as string);
                isLoggedInVar(true);
                console.log(isLoggedInVar)
            }
        }
    });
    return async (variables: SignupDto) => {
        try {
            const {
                email,
                username,
                password,
                diet,
                objective,
                height,
                weight
            } = variables
            const { data, } = await signup({
                variables: {
                    signupDto: {
                        email,
                        username,
                        password,
                        diet,
                        objective,
                        height,
                        weight
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
    token: string
}

interface LoginDto {
    email: String
    password: String
}


const LOGIN = gql`
  mutation Login($loginDto: LoginDto!) {
    login(loginDto: $loginDto) {
      token
    }
  }
`;


export const useLogin = () => {
    const [login] = useMutation<{ login: LoginData }, { loginDto: LoginDto }>(LOGIN, {
        async onCompleted({ login }) {
            if (login) {
                await SecureStore.setItemAsync('token', login.token as string);
                isLoggedInVar(true);
                const { data } = IsLoggedIn()
                console.log({ data })

            }
        }
    });
    return async (variables: LoginDto, onCompleted: any) => {
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

interface ForgotPasswordRequestDto {
    email: String
}

const FORGOT_PASSWORD_REQUEST = gql`
    mutation ResetPasswordRequest($forgotPasswordRequestDto: ForgotPasswordRequestDto!) {
        resetPasswordRequest(forgotPasswordRequestDto: $forgotPasswordRequestDto) {
            isRequestAccepted
        }
    }
`;


export const useResetPasswordRequest = () => {
    const [forgotPasswordRequest] = useMutation<{ data: ResetPasswordRequestData }, { forgotPasswordRequestDto: ForgotPasswordRequestDto }>(FORGOT_PASSWORD_REQUEST)
    return async (variables: ForgotPasswordRequestDto) => {
        try {
            const { email } = variables
            const { data } = await forgotPasswordRequest({
                variables: {
                    forgotPasswordRequestDto: { email }
                }
            })
            return { data }
        }
        catch (error) {
            throw new Error(error)
        }
    }
}

const LOGOUT = gql`
  mutation Logout {
    logout {
      isLoggedOut
    }
  }
`;

export const useLogout = () => {
    const [logout] = useMutation(LOGOUT);
    return async () => {
        try {
            const { data } = await logout()
            return { data }
        }
        catch (error) {
            throw new Error(error)
        }
    }

}
