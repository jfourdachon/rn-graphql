import React from 'react';

import { StyleSheet, View } from 'react-native';
import { Colors } from '../../contants/Colors';
import LoginForm from '../forms/LoginForm';
import SignupFlow from '../forms/signupFlow';
import { AuthScreenNavigationProp } from '../../screens/AuthScreen';

interface Props {
  isLogin: boolean;
  navigation?: AuthScreenNavigationProp;
}

const AuthForm = ({ isLogin, navigation }: Props) => {
  return !isLogin ? (
    <View style={styles.formContainer}>
      <SignupFlow />
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
    display: 'flex',
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
