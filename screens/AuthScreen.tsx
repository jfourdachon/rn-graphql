import React, { useState } from 'react';
import { useFormik } from 'formik';
import tailwind from 'tailwind-rn';
import { Button, StyleSheet, Text, TextInput, View, Switch, Alert, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParam } from '../navigation/AuthNavigator';
import { useSignup } from '../store/auth/mutations';
import Touchable from '../components/atoms/touchable/Touchable';
import AuthForm from '../components/forms/AuthForm';
import { ScrollView } from 'react-native-gesture-handler';

type AuthScreenNavigationProp = StackNavigationProp<AuthStackParam, 'Auth'>;

type Props = {
  navigation: AuthScreenNavigationProp;
};

const AuthScreen = ({ navigation }: Props) => {
    const [isLogin, setIsLogin] = useState(false)
    const toggleForm = () => {
        setIsLogin(prevState => !prevState)
    }
    const switchFormText = isLogin ? 'Pas encore de compte? Inscrit toi' : 'Déjà un compte? Connecte toi'
  return (
    <ScrollView contentContainerStyle={[styles.screen, tailwind('bg-blue-100')]}>
      <AuthForm isLogin={isLogin} />
      <Touchable onPress={toggleForm}>
      <View style={[styles.switchFormTextContainer, tailwind('p-2')]}>
          <Text>
              {switchFormText}
          </Text>
      </View>
      </Touchable>
    </ScrollView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchFormTextContainer: {
      marginTop: 20
  },
  switchFormText: {
      textDecorationLine: 'underline'
  }
});
