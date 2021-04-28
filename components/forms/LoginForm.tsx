import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useLogin, useResetPasswordRequest } from '../../store/auth/mutations';
import { Colors } from '../../contants/Colors';
import Touchable from '../UI/touchable/Touchable';
import InputText from '../UI/InputText';

type LoginValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [InvalidCrentials, setInvalidCrentials] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);
  const login = useLogin();
  const resetPasswordRequest = useResetPasswordRequest();

  const handleLogin = async (values: LoginValues) => {
    const { email, password } = values;
    const { data, error } = await login({ email, password });
    if (error) {
      console.log(error.message);
      setInvalidCrentials(error.message);
    }
    if (data) {
      console.log(data);
    }
  };

  const handleResetPasswordRequest = async (values: LoginValues) => {
    const { data } = await resetPasswordRequest({ email: values.email });
    if (data) {
      console.log(data);
    }
  };

  const handleSubmit = (values: LoginValues) => {
    handleLogin(values);
  };

  const authFormSchema = Yup.object().shape({
    password: Yup.string().min(5, 'Too Short!').max(20, 'Too Long!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    // validate,
    validationSchema: authFormSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  return !forgotPassword ? (
    <>
      <InputText placeholder='email' onChangeText={formik.handleChange('email')} value={formik.values.email} onBlur={formik.handleBlur('email')} />

      {formik.touched.email && formik.errors.email ? <Text>{formik.errors.email}</Text> : null}
      <InputText placeholder='password' onChangeText={formik.handleChange('password')} value={formik.values.password} onBlur={formik.handleBlur('password')} />

      {formik.touched.password && formik.errors.password ? <Text>{formik.errors.password}</Text> : null}
      <Touchable onPress={() => handleSubmit(formik.values)}>
        <View style={styles.btnView}>
          <Text style={styles.btnText}>Valider</Text>
        </View>
      </Touchable>
      <Touchable onPress={() => setForgotPassword(true)}>
        <View style={styles.forgotPwdContainer}>
          <Text>Forgot password ?</Text>
        </View>
      </Touchable>
      {InvalidCrentials ? <Text>{InvalidCrentials}</Text> : null}
    </>
  ) : (
    <>
      <Touchable onPress={() => setForgotPassword(false)}>
        <View style={styles.forgotPwdContainer}>
          <Text>Go back</Text>
        </View>
      </Touchable>
      <InputText placeholder='email' onChangeText={formik.handleChange('email')} value={formik.values.email} onBlur={formik.handleBlur('email')} />
      <Touchable onPress={() => handleResetPasswordRequest(formik.values)}>
        <View style={styles.btnView}>
          <Text style={styles.btnText}>Valider</Text>
        </View>
      </Touchable>
    </>
    //TODO forgot password component here
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  btnView: {
    minWidth: 180,
    width: '70%',
    paddingVertical: 5,
    marginTop: 15,
    backgroundColor: Colors.accent,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  forgotPwdContainer: {
    width: Dimensions.get('window').width / 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
});
