import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParam } from '../navigation/AuthNavigator';


type AuthScreenNavigationProp = StackNavigationProp<
AuthStackParam,
  'Auth'
>;


type Props = {
    navigation: AuthScreenNavigationProp;
  };



const AuthScreen = ({navigation}: Props) => {
    return (
        <View style={styles.screen}>
            <Text>Ici le formulaire de connexion</Text>
            <Button title="Press me" onPress={() => navigation.navigate('Home')} />
        </View>
    )
}

export default AuthScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    }
})
