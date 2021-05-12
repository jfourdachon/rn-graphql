import React, { SetStateAction } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

interface Props {
    onAnimationFinish: SetStateAction<any>
}

const SplashScreen = ({onAnimationFinish}: Props) => {
  return (
    <View style={styles.sreen}>
      <LottieView style={styles.animation} source={require('../assets/lottie/splash.json')} autoPlay onAnimationFinish={onAnimationFinish} />
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
