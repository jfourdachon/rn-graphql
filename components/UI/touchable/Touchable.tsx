import React from 'react';
import { TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native';

type Iprops = {
  children: React.ReactNode;
  style?: {};
  onPress: () => void
};

const Touchable = ({ children, style, onPress }: Iprops) => {
  return Platform.Version >= 21 ? <TouchableNativeFeedback style={style} onPress={onPress}>{children}</TouchableNativeFeedback> : <TouchableOpacity style={style} onPress={onPress}>{children}</TouchableOpacity>;
};

export default Touchable;
