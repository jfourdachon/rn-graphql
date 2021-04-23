import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Button, StyleSheet, Text, TextInput, View, Switch, Alert, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParam } from '../navigation/AuthNavigator';
import { useSignup } from '../store/auth/mutations';

type AuthScreenNavigationProp = StackNavigationProp<AuthStackParam, 'Auth'>;

type Props = {
  navigation: AuthScreenNavigationProp;
};

interface FormValues {
  email: string;
  username: string;
  password: string;
  isVegetarian: boolean;
}

interface FormValuesErrors {
  email: string;
  username: string;
  password: string;
  isVegetarian: string;
}

const AuthScreen = ({ navigation }: Props) => {
  const [isVegetarian, setIsVegetarian] = useState(false);
  const toggleSwitch = () => setIsVegetarian((previousState) => !previousState);
  const signup = useSignup();

  const handleSignUp = async (values: FormValues) => {
    const { email, password, username } = values;
    const { data, loading } = await signup({ email, password, username, isVegetarian });
    if (loading) {
      console.log('loading...');
    }
    if (data) {
      console.log(data);
    }
    Alert.alert('Submit', values.email, [{ text: 'Okay' }]);
  };

  const validate = (values: FormValues) => {
    const errors: FormValuesErrors = {
      email: '',
      password: '',
      isVegetarian: '',
      username: '',
    };
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.username) {
      errors.username = 'Required';
    } else if (values.username.length < 3) {
      errors.username = 'Min 3 characters';
    }

    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 6) {
      errors.password = 'Invalid password, at least 6 characters';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      isVegetarian: false,
    },
    validate,
    onSubmit: (values) => {
      handleSignUp(values);
    },
  });

  return (
    <View style={styles.screen}>
      <TextInput style={styles.input} placeholder='email' onChangeText={formik.handleChange('email')} value={formik.values.email} onBlur={formik.handleBlur('email')} />
      {formik.touched.email && formik.errors.email ? <Text>{formik.errors.email}</Text> : null}
      <TextInput style={styles.input} placeholder='username' onChangeText={formik.handleChange('username')} value={formik.values.username} onBlur={formik.handleBlur('username')} />
      {formik.touched.username && formik.errors.username ? <Text>{formik.errors.username}</Text> : null}
      <TextInput style={styles.input} placeholder='password' onChangeText={formik.handleChange('password')} value={formik.values.password} onBlur={formik.handleBlur('password')} />
      {formik.touched.password && formik.errors.password ? <Text>{formik.errors.password}</Text> : null}
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>Are you vegetarian?</Text>
        <Switch trackColor={{ false: '#767577', true: '#81b0ff' }} thumbColor={isVegetarian ? '#f5dd4b' : '#f4f3f4'} ios_backgroundColor='#3e3e3e' onValueChange={toggleSwitch} value={isVegetarian} />
      </View>
      <Button title='Valider' onPress={() => handleSignUp(formik.values)} />
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: Dimensions.get('window').width / 2,
    backgroundColor: '#ece7e7',
    marginVertical: 10,
  },
});
