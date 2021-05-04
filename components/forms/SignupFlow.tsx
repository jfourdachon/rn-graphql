import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Touchable from '../UI/touchable/Touchable';
import { Colors } from '../../contants/Colors';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const slideList = [
  { step: 0, title: "Allez c'est parti" },
  { step: 1, title: 'Quels sont tes objectifs' },
  {
    step: 2,
    title: 'Tes habitudes alimentaires.',
  },
  { step: 3, title: 'Okay, Récapitulons' },
  { step: 4, title: 'Inscription' },
];

enum OBJECTIVES {
  UP = 'Prendre du poids',
  DOWN = 'Perder du poids',
  NULL = "Pas d'objectif",
}

const Objectives = () => {
  const [objective, setObjective] = useState<OBJECTIVES>(OBJECTIVES.NULL);
  const weigthObj: OBJECTIVES[] = [OBJECTIVES.DOWN, OBJECTIVES.UP, OBJECTIVES.NULL];

  return (
    <View style={styles.objectiveContainer}>
      {weigthObj.map((object) => (
        <View style={styles.test}>
          <Touchable onPress={() => setObjective(object)}>
            <View style={objective !== object ?  styles.objectiveBtn : styles.selectedBtn}>
              <Text style={objective !== object ?  styles.objectiveText : styles.selectedText}>{object}</Text>
            </View>
          </Touchable>
        </View>
      ))}
    </View>
  );
};
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
        height: '100%',
        width: windowWidth,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View style={styles.textContainer}>
        <Text style={styles.title}>{data.title}</Text>
      </View>
      {data.step === 0 && <Objectives />}
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
    <View style={{ flex: 1 }}>
      <FlatList
        ref={(ref) => (listRef.current = ref)}
        data={slideList}
        style={{ height: '90%' }}
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

      <View style={{ height: '10%' }}>
        <TouchableOpacity onPress={nextStep}>
          <Text> {stepIndex < slideList.length - 1 ? 'Next Step' : 'Submit'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupFlow;

const styles = StyleSheet.create({
  textContainer: {
    height: '30%',
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 22,
    fontFamily: 'fira-medium',
    color: Colors.lightGrey,
  },
  objectiveContainer: {
    height: '35%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  test: { borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: 'black', backgroundColor: 'white' },
  objectiveBtn: {
    minWidth: 240,
    width: '100%',
  },
  selectedBtn: {
    minWidth: 240,
    width: '100%',
    backgroundColor: 'gray'
  },
  objectiveText: {
    fontSize: 18,
    paddingVertical: 10,
    textAlign: 'center',
    fontFamily: 'fira-medium',
    color: Colors.primaryLight,
  },
  selectedText : {
    fontSize: 18,
    paddingVertical: 10,
    textAlign: 'center',
    fontFamily: 'fira-medium',
    color: Colors.light,
  }
});
