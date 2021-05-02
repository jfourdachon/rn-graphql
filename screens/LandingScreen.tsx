import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import SvgComponent from '../assets/svg/Wave';
import { Colors } from '../contants/Colors';

const LandingScreen = () => {
  return (
    <View style={styles.screen}>
      <View style={styles.topPart}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Hygie Pocket</Text>
        </View>
        <View style={styles.animationContainer}>
          <LottieView style={styles.animation} source={require('../assets/lottie/landing.json')} autoPlay loop />
        </View>
      </View>
      <View style={styles.bottomPart}>
        <SvgComponent width='100%' height='100%' style={styles.imageContainer} />
        <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle}>Bienvenue Chez les Hygies</Text>
        <Text style={styles.welcomeText}>Que ton aliment soit ton premier remède. (Hippocrate)</Text>
        </View>

        <Text>Hello</Text>
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
  titleContainer: {},
  title: {},
  animationContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 50,
  },
  animation: {
      width: 200,
      height: 250
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
  welcomeContainer: {},
  welcomeTitle: {},
  welcomeText: {},
  authContainer: {}
});
