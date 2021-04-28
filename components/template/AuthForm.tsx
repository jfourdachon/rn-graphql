import React from 'react';

import { StyleSheet, View } from 'react-native';
import { Colors } from '../../contants/Colors';
import LoginForm from '../forms/LoginForm';
import SignupForm from '../forms/SignupForm';


interface Props {
  isLogin: boolean;
}

const AuthForm = ({ isLogin }: Props) => {

  return !isLogin ? (
    <View style={styles.formContainer}>
      <SignupForm />
    </View>
  ) : (
    <View style={styles.formContainer}>
      <LoginForm />
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
  }
});
