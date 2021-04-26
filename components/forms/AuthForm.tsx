import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Button, StyleSheet, Text, TextInput, View, Switch, Alert, Dimensions } from 'react-native';
import { useLogin, useSignup } from '../../store/auth/mutations';
import { Colors } from '../../contants/Colors';
import Touchable from '../atoms/touchable/Touchable';

type SignupValues = {
  email: string;
  username: string;
  password: string;
  isVegetarian: boolean;
}


type LoginValues =  {
  email: string;
  password: string;
}

interface FormValuesErrors {
    email: string;
    username: string;
    password: string;
    isVegetarian: string;
  }
  

interface Props {
  isLogin: boolean;
}

const AuthForm = ({ isLogin }: Props) => {
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [errorMail, setErrorMail] = useState('');
  const toggleSwitch = () => setIsVegetarian((previousState) => !previousState);
  const signup = useSignup();
  const login = useLogin();

  const handleSignUp = async (values: SignupValues) => {
    setErrorMail('');
    const { email, password, username } = values;
    const { data, error } = await signup({ email, password, username, isVegetarian });
    if (error) {
      if (error.message === 'Email is already in use') setErrorMail(error.message);
    }
  };

  const handleLogin = async (values: LoginValues) => {
    const { email, password } = values;
    const { data, error } = await login({ email, password });
    if (error) {
      console.log(error.message);
    }
    if (data) {
        console.log(data)
    }
  };

  const handleSubmit = (values: SignupValues) => {
    if (!isLogin ) {
        handleSignUp(values)
    } else {
        handleLogin(values)
    }
  } 

  const authFormSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Required'),
    password: Yup.string()
      .min(5, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Required'),
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
      isLogin ? handleLogin(values) : handleSignUp(values);
    },
  });

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder='email'
        onChangeText={formik.handleChange('email')}
        value={formik.values.email}
        onBlur={formik.handleBlur('email')}
      />
      {formik.touched.email && formik.errors.email ? <Text>{formik.errors.email}</Text> : null}
      {errorMail ? <Text>{errorMail}</Text> : null}
      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder='username'
          onChangeText={formik.handleChange('username')}
          value={formik.values.username}
          onBlur={formik.handleBlur('username')}
        />
      )}
      {!isLogin && formik.touched.username && formik.errors.username ? <Text>{formik.errors.username}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder='password'
        onChangeText={formik.handleChange('password')}
        value={formik.values.password}
        onBlur={formik.handleBlur('password')}
      />
      {formik.touched.password && formik.errors.password ? <Text>{formik.errors.password}</Text> : null}
      {!isLogin && (
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
      )}
      <Touchable onPress={() => handleSubmit(formik.values)}>
        <View style={styles.btnView}>
          <Text style={styles.btnText}>Valider</Text>
        </View>
      </Touchable>
    </View>
  );
};

export default AuthForm;

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
  input: {
    height: 40,
    paddingHorizontal: 5,
    width: Dimensions.get('window').width / 2,
    backgroundColor: '#ece7e7',
    marginVertical: 10,
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
