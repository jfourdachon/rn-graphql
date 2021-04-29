import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useLogin, useResetPasswordRequest } from '../../store/auth/mutations';
import { Colors } from '../../contants/Colors';
import Touchable from '../UI/touchable/Touchable';
import InputText from '../UI/InputText';

type ResetPasswordValues = {
  password: string;
  confirmPassword: string
};

const LoginForm = () => {
  const [InvalidCrentials, setInvalidCrentials] = useState('');
//   const handleLogin = async (values: LoginValues) => {
//     const { email, password } = values;
//     const { data, error } = await login({ email, password });
//     if (error) {
//       console.log(error.message);
//       setInvalidCrentials(error.message);
//     }
//     if (data) {
//       console.log(data);
//     }
//   };

//   const handleResetPasswordRequest = async (values: LoginValues) => {
//     const { data } = await resetPasswordRequest({ email: values.email });
//     if (data) {
//       console.log(data);
//     }
//   };

  const handleSubmit = (values: ResetPasswordValues) => {
      //  TODO Reset Password mutation
    // handleLogin(values);
  };

  const authFormSchema = Yup.object().shape({
    password: Yup.string().min(5, 'Too Short!').max(20, 'Too Long!').required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const formik = useFormik({
    initialValues: {
        password: '',
        confirmPassword: '',
     
    },
    // validate,
    validationSchema: authFormSchema,
    onSubmit: (values) => {
    //   handleLogin(values);
    },
  });

  return (
    <>
      <InputText placeholder='password' onChangeText={formik.handleChange('password')} value={formik.values.password} onBlur={formik.handleBlur('password')} />

      {formik.touched.password && formik.errors.password ? <Text>{formik.errors.password}</Text> : null}
      <InputText placeholder='confirm password' onChangeText={formik.handleChange('confirmPassword')} value={formik.values.confirmPassword} onBlur={formik.handleBlur('confirmPassword')} />

      {formik.touched.confirmPassword && formik.errors.confirmPassword ? <Text>{formik.errors.confirmPassword}</Text> : null}
      <Touchable onPress={() => handleSubmit(formik.values)}>
        <View style={styles.btnView}>
          <Text style={styles.btnText}>Valider</Text>
        </View>
      </Touchable>
     
      {InvalidCrentials ? <Text>{InvalidCrentials}</Text> : null}
    </>
  ) 
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
