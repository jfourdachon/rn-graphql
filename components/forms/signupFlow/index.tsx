import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Touchable from '../../UI/touchable/Touchable';
import { Colors } from '../../../contants/Colors';
import Slide from './components/Slide';

const slideList = [
  {
    title: "Allez c'est parti",
    subtitle: 'Quels sont ton poids et ta taille ?',
  },
  { title: 'Dis nous un peu', subtitle: 'As tu un objectif de poids ?' },
  {
    title: 'Tes habitudes alimentaires.',
    subtitle: 'Quel est ton régime ?',
  },
  { title: 'Okay, Récapitulons' },
  { title: 'Inscription' },
];

const SignupFlow = () => {
  const listRef = useRef<any>();
  const [stepIndex, setStepIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const nextStep = () => {
    console.log('next tapped...');
    setCurrentStepIndex(stepIndex + 1);
    listRef.current.scrollToIndex({
      index: currentStepIndex + 1,
      animated: true,
    });
    setStepIndex(stepIndex + 1);
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={(ref) => (listRef.current = ref)}
        data={slideList}
        style={{ height: '90%' }}
        keyExtractor={(item) => item.step}
        renderItem={({ item }) => {
          return <Slide data={item} index={stepIndex} />;
        }}
        scrollEnabled={false}
        initialNumToRender={1}
        initialScrollIndex={0}
        refreshing={false}
        pagingEnabled={true}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
      />

      <View style={styles.nextBtnContainer}>
        <TouchableOpacity onPress={nextStep}>
          <Text style={styles.btnText}>
            {stepIndex < slideList.length - 1 ? 'Next Step' : 'Submit'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupFlow;

const styles = StyleSheet.create({
  nextBtnContainer: {
    height: '15%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 50,
    borderRadius: 20,
    overflow: 'hidden',
  },
  btnText: {
    fontFamily: 'fira-medium',
    fontSize: 18,
    color: Colors.light,
  },
});
