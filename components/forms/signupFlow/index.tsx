import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '../../../contants/Colors';
import Slide from './components/Slide';


export enum OBJECTIVES {
  UP = 'Prendre du poids',
  DOWN = 'Perder du poids',
  HEALTH_FOOD = "Améliorer mon alimentation",
}

export enum DIET {
    VEGETARIAN = 'Végétarien',
    VEGAN = 'Végan',
    FLEX = 'Flexitarien',
    OTHER = 'Autre'
}


export interface SignUpInfos {
    objective: OBJECTIVES | null
    height: number | ""
    weight: number | ""
    diet: keyof DIET | null
}

const slideList = [
  {
    title: "Allez c'est parti",
    subtitle: 'Ton objectif ?',
  },
  { title: 'Dis nous un peu', subtitle: 'Actuellement ou en es tu ?' },
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
  const [signupInfos, setSignupInfos] = useState<SignUpInfos>({objective: null, height: "", weight: "", diet: null})
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const nextStep = () => {
      const goNext = () => {
        setCurrentStepIndex(stepIndex + 1);
        listRef.current.scrollToIndex({
          index: currentStepIndex + 1,
          animated: true,
        });
        setStepIndex(stepIndex + 1);
      }
    switch(stepIndex) {
        case(0):
            if(signupInfos.objective) {
                goNext()
            }
            break
        case(1):
            if (signupInfos.weight && signupInfos.height) {
                goNext()
            }
        case(2):
            if (signupInfos.diet) {
                goNext()
            }
    }
   
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={(ref) => (listRef.current = ref)}
        data={slideList}
        style={{ height: '90%' }}
        keyExtractor={(_, key) => key.toString()}
        renderItem={({ item }) => {
          return <Slide data={item} index={stepIndex} setSignupInfos={setSignupInfos} signupInfos={signupInfos} />;
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
