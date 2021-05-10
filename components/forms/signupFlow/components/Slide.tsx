import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../../../contants/Colors';
import ObjectiveStep from './ObjectiveStep';
import {SignUpInfos} from '../index'
import CurrentShape from './CurrentShape';
import CurrentDiet from './CurrentDiet';
import Recap from './Recap';
import { WindowWidth } from '../../../../contants/window';

interface Props {
  data: { title: string; subtitle: string };
  index: number;
  setSignupInfos: Dispatch<SetStateAction<SignUpInfos>>
  signupInfos: SignUpInfos
}

const Slide = ({ data, index, setSignupInfos, signupInfos }: Props) => {
  return (
    <View style={styles.slide}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.title}>{data.subtitle}</Text>
      </View>
      {index === 0 && <ObjectiveStep setSignupInfos={setSignupInfos} signupInfos={signupInfos} />}
      {index === 1 && <CurrentShape setSignupInfos={setSignupInfos} signupInfos={signupInfos} />}
      {index === 2 && <CurrentDiet setSignupInfos={setSignupInfos} signupInfos={signupInfos} />}
      {index === 3 && <Recap  signupInfos={signupInfos} />}
    </View>
  );
};

export default Slide;

const styles = StyleSheet.create({
  slide: {
    height: '100%',
    width: WindowWidth,
    paddingTop: 80,
  },
  titleContainer: {
    height: '25%',
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 22,
    fontFamily: 'fira-medium',
    color: Colors.light,
    textAlign: 'center',
  },
});
