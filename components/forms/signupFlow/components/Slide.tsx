import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../../../contants/Colors';
import ObjectiveStep from './ObjectiveStep';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

interface Props {
  data: { title: string; subtitle: string };
  index: number;
}

const Slide = ({ data, index }: Props) => {
  return (
    <View style={styles.slide}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.title}>{data.subtitle}</Text>
      </View>
      {index === 0 && <ObjectiveStep />}
    </View>
  );
};

export default Slide;

const styles = StyleSheet.create({
  slide: {
    height: '100%',
    width: windowWidth,
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
