import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useLogin, useResetPasswordRequest } from '../../store/auth/mutations';
import { Colors } from '../../contants/Colors';
import Touchable from '../UI/touchable/Touchable';
import InputText from '../UI/InputText';
import Toast from '../UI/Toast';
import { WindowHeight, WindowWidth } from '../../contants/window';

interface LoginValues {
  email: string;
  password: string;
}

interface ForgotPasswordRequestValues {
  email: string;
}

const LoginForm = () => {
  const [InvalidCrentials, setInvalidCrentials] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const login = useLogin();
  const resetPasswordRequest = useResetPasswordRequest();

  const handleLogin = async (values: LoginValues) => {
    setIsLoading(true);
    const { email, password } = values;
    const { data, error } = await login({ email, password }, {});
    if (error) {
      console.log(error.message);
      setInvalidCrentials(error.message);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const handleResetPasswordRequest = async (
    values: ForgotPasswordRequestValues
  ) => {
    setIsToastVisible(true);

    const { data } = await resetPasswordRequest({ email: values.email });
  };

  const handleSubmit = (values: LoginValues) => {
    handleLogin(values);
  };

  const loginFormSchema = Yup.object().shape({
    password: Yup.string()
      .min(5, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    // validate,
    validationSchema: loginFormSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  const forgotPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(5, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

  const forgotPasswordFormik = useFormik({
    initialValues: {
      email: '',
    },
    // validate,
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => {
      handleResetPasswordRequest(values);
    },
  });
  console.log(isLoading);
  return !forgotPassword ? (
    <View style={styles.formContainer}>
      <InputText
        style={styles.input}
        placeholder='email'
        onChangeText={formik.handleChange('email')}
        value={formik.values.email}
        onBlur={formik.handleBlur('email')}
      />

      {formik.touched.email && formik.errors.email ? (
        <Text>{formik.errors.email}</Text>
      ) : null}
      <InputText
        style={styles.input}
        placeholder='password'
        onChangeText={formik.handleChange('password')}
        value={formik.values.password}
        onBlur={formik.handleBlur('password')}
      />

      {formik.touched.password && formik.errors.password ? (
        <Text>{formik.errors.password}</Text>
      ) : null}
      <Touchable onPress={() => handleSubmit(formik.values)}>
        <View style={styles.btnView}>
          {!isLoading ? (
            <Text style={styles.btnText}>Valider</Text>
          ) : (
            <ActivityIndicator
              animating={isLoading}
              size='small'
              color='#2e3be7'
            />
          )}
        </View>
      </Touchable>
      <Touchable onPress={() => setForgotPassword(true)}>
        <View style={styles.forgotPwdContainer}>
          <Text>Forgot password ?</Text>
        </View>
      </Touchable>
      {InvalidCrentials ? <Text>{InvalidCrentials}</Text> : null}
    </View>
  ) : (
    <View style={styles.formContainer}>
      <Touchable onPress={() => setForgotPassword(false)}>
        <View style={styles.forgotPwdContainer}>
          <Text>Go back</Text>
        </View>
      </Touchable>
      <InputText
        style={styles.input}
        placeholder='email'
        onChangeText={forgotPasswordFormik.handleChange('email')}
        value={forgotPasswordFormik.values.email}
        onBlur={forgotPasswordFormik.handleBlur('email')}
      />
      <Touchable
        onPress={() => handleResetPasswordRequest(forgotPasswordFormik.values)}
      >
        <View style={styles.btnView}>
        {!isLoading ? (
            <Text style={styles.btnText}>Valider</Text>
          ) : (
            <ActivityIndicator
              animating={isLoading}
              size='small'
              color='#2e3be7'
            />
          )}
        </View>
      </Touchable>
      <Toast
        isToastVisible={isToastVisible}
        navigation={setForgotPassword}
        setIsToastVisible={setIsToastVisible}
        toastText="Si votre email est enregistré chez nous, vous allez recevoir un email avec la procédure d'oubli de mot de passe"
      />
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  formContainer: {
    width: WindowWidth,
    height: WindowHeight,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnView: {
    width: Dimensions.get('window').width / 2,
    paddingVertical: 5,
    marginTop: 35,
    backgroundColor: Colors.lightGrey,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 18,
    color: Colors.primaryDark,
    fontFamily: 'fira-medium',
    textAlign: 'center',
  },
  forgotPwdContainer: {
    width: Dimensions.get('window').width / 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  input: {
    borderRadius: 6,
    width: Dimensions.get('window').width / 2,
  },
});
