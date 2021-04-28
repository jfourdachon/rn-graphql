import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { StyleSheet, Text, View, Switch } from 'react-native';
import { useSignup, useResetPasswordRequest } from '../../store/auth/mutations';
import Touchable from '../UI/touchable/Touchable';
import InputText from '../UI/InputText';
import { Colors } from '../../contants/Colors';

type SignupValues = {
  email: string;
  username: string;
  password: string;
  isVegetarian: boolean;
};


const SignupForm = () => {
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [errorMail, setErrorMail] = useState('');
  const toggleSwitch = () => setIsVegetarian((previousState) => !previousState);
  const signup = useSignup();
  const resetPasswordRequest = useResetPasswordRequest();

  const handleSignUp = async (values: SignupValues) => {
    setErrorMail('');
    const { email, password, username } = values;
    const { error } = await signup({ email, password, username, isVegetarian });
    if (error) {
      if (error.message === 'Email is already in use') setErrorMail(error.message);
    }
  };

  const handleSubmit = (values: SignupValues) => {
    handleSignUp(values);
  };

  const authFormSchema = Yup.object().shape({
    username: Yup.string().min(3, 'Too Short!').max(20, 'Too Long!').required('Required'),
    password: Yup.string().min(5, 'Too Short!').max(20, 'Too Long!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      isVegetarian: false,
    },
    // validate,
    validationSchema: authFormSchema,
    onSubmit: (values) => {
      handleSignUp(values);
    },
  });

  return (
    <>
      <InputText
        placeholder='email'
        onChangeText={formik.handleChange('email')}
        value={formik.values.email}
        onBlur={formik.handleBlur('email')}
      />

      {formik.touched.email && formik.errors.email ? <Text>{formik.errors.email}</Text> : null}
      {errorMail ? <Text>{errorMail}</Text> : null}
      <InputText
        placeholder='username'
        onChangeText={formik.handleChange('username')}
        value={formik.values.username}
        onBlur={formik.handleBlur('username')}
      />
      {formik.touched.username && formik.errors.username ? <Text>{formik.errors.username}</Text> : null}
      <InputText
        placeholder='password'
        onChangeText={formik.handleChange('password')}
        value={formik.values.password}
        onBlur={formik.handleBlur('password')}
      />
      {formik.touched.password && formik.errors.password ? <Text>{formik.errors.password}</Text> : null}
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>Are you vegetarian?</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isVegetarian ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor='#3e3e3e'
          onValueChange={toggleSwitch}
          value={isVegetarian}
        />
      </View>
      <Touchable onPress={() => handleSubmit(formik.values)}>
        <View style={styles.btnView}>
          <Text style={styles.btnText}>Valider</Text>
        </View>
      </Touchable>
    </>
  );
};

export default SignupForm;

const styles = StyleSheet.create({
  switchContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
  switchText: {
    fontSize: 18,
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
});
