import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import SvgComponent from '../assets/svg/Wave';
import { Colors } from '../contants/Colors';
import Touchable from '../components/UI/touchable/Touchable';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParam } from '../navigation/AuthNavigator';

type LandingScreenNavigationProp = StackNavigationProp<AuthStackParam, 'Landing'>;

type Props = {
  navigation: LandingScreenNavigationProp;
};

const LandingScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.topPart}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Titre <Text style={styles.titleRightPart}>Appli</Text>
          </Text>
        </View>
        <View style={styles.animationContainer}>
          <LottieView style={styles.animation} source={require('../assets/lottie/landing.json')} autoPlay loop />
        </View>
      </View>
      <View style={styles.bottomPart}>
        <SvgComponent width='100%' height='100%' style={styles.imageContainer} />
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>Bienvenue chez les ****</Text>
          <Text style={styles.welcomeText}>Que ton aliment soit ton premier remède. (Hippocrate)</Text>
        </View>
        <View style={styles.authContainer}>
          <Touchable onPress={() => navigation.navigate('Auth', { shouldLogin: false })} style={styles.touchable}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Rejoins nous!</Text>
            </View>
          </Touchable>
          <View style={styles.shouldLoginContainer}>
            <Text style={styles.shouldLoginText}>Tu es déja inscrit ? </Text>
            <Touchable
              onPress={() =>
                navigation.navigate('Auth', {
                  shouldLogin: true,
                })
              }
            >
              <Text style={styles.shouldLoginLink}>Connnecte toi</Text>
            </Touchable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
  },
  topPart: {
    height: '50%',
    backgroundColor: Colors.light,
  },
  titleContainer: {
    marginTop: 40,
  },
  title: {
    textAlign: 'center',
    fontSize: 26,
    fontFamily: 'fira-bold',
    color: Colors.accent,
  },
  titleRightPart: {
    color: Colors.primary,
  },
  animationContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  animation: {
    width: 200,
    height: 250,
  },
  bottomPart: {
    height: '50%',
    width: '100%',
    backgroundColor: Colors.primary,
    position: 'relative',
  },
  imageContainer: {
    position: 'absolute',
    bottom: '45%',
  },
  welcomeContainer: {
    height: '40%',
    paddingTop: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 35,
  },
  welcomeTitle: {
    fontSize: 20,
    fontFamily: 'fira-medium',
    color: Colors.light,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 16,
    fontFamily: 'fira',
    textAlign: 'center',
    color: Colors.lightGrey,
  },
  authContainer: {
    height: '60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  touchable: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  btn: {
    width: '100%',
    height: 50,
    maxWidth: 350,
    backgroundColor: Colors.light,
    paddingVertical: 10,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
  },
  btnText: {
    textAlign: 'center',
    color: Colors.primary,
    fontSize: 18,
    fontFamily: 'fira-medium',
  },
  shouldLoginContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  shouldLoginText: {
    color: Colors.lightGrey,
  },
  shouldLoginLink: {
    fontFamily: 'fira-bold',
    fontSize: 16,
    color: Colors.light,
  },
});
