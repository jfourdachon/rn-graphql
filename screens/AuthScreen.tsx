import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import tailwind from 'tailwind-rn';
import { Button, StyleSheet, Text, TextInput, View, Switch, Alert, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { AuthStackParam } from '../navigation/AuthNavigator';
import { useSignup } from '../store/auth/mutations';
import Touchable from '../components/UI/touchable/Touchable';
import AuthForm from '../components/template/AuthForm';
import { ScrollView } from 'react-native-gesture-handler';

type AuthScreenNavigationProp = StackNavigationProp<AuthStackParam, 'Auth'>;
type AuthScreenRouteProp = RouteProp<AuthStackParam, 'Auth'>;

type Props = {
  navigation?: AuthScreenNavigationProp;
  route?: AuthScreenRouteProp 
};

const AuthScreen = ({ navigation, route }: Props) => {
    useEffect(() => {
        route?.params.shouldLogin && setIsLogin(true)
    }, [route])
    const [isLogin, setIsLogin] = useState(false)
    console.log(route)
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
