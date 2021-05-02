import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

const SplashScreen = () => {
  return (
    <View style={styles.sreen}>
      <LottieView style={styles.animation} source={require('../assets/lottie/splash.json')} autoPlay loop />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  sreen: {
    flex: 1,
  },
  animation: {
    flex: 1,
  },
});
