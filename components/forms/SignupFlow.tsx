import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const slideList = [
  { step: 0, title: "Allez c'est parti", subtitle: 'Commence par renseigner les élements suivants' },
  { step: 1, title: 'Intéréssant^^', subtitle: 'Quels sont tes objectif' },
  {
    step: 2,
    title: "Si c'est ce que tu veux, alors nous le voulons aussi pour toi!",
    subtitle: 'Maintenant passons à tes habitudes alimentaires',
  },
  { step: 3, title: "J'étais sur que tu dirais ca", subtitle: 'Okay, Récapitulons' },
  { step: 4, title: 'Inscription' },
];

interface Props {
  data: { step: number; title: string; subtitle: string };
}

function Slide({ data }: Props) {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  indexRef.current = index;

  // Use the index
  useEffect(() => {
    console.warn(index);
  }, [index]);

  return (
    <View
      style={{
        height: '70%',
        width: windowWidth,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 24 }}>{data.title}</Text>
      <Text style={{ fontSize: 18 }}>{data.subtitle}</Text>
    </View>
  );
}

const SignupFlow = () => {
  const listRef = useRef<any>();
  const [stepIndex, setStepIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const nextStep = () => {
    console.log('next tapped...');
    setCurrentStepIndex(stepIndex + 1);
    listRef.current.scrollToIndex({ index: currentStepIndex + 1, animated: true });
    setStepIndex(stepIndex + 1);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        ref={(ref) => (listRef.current = ref)}
        data={slideList}
        style={{ height: '50%' }}
        keyExtractor={(item) => item.step}
        renderItem={({ item }) => {
          return <Slide data={item} />;
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

      <View style={{height: '10%'}}>
        {/* <TouchableOpacity onPress={this.previousStep}>
          <Text>Prev Step</Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={nextStep}>
          <Text> {stepIndex < slideList.length - 1 ? 'Next Step' : 'Submit'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignupFlow;

const styles = StyleSheet.create({});
