import React, { useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '../../../contants/Colors';
import { WindowHeight, WindowWidth } from '../../../contants/window';
import SignupForm from '../SignupForm';
import Slide from './components/Slide';
import { SignUpInfos } from './types';


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
  const [signupInfos, setSignupInfos] = useState<SignUpInfos>({
    objective: null,
    height: 150,
    weight: 60,
    diet: null,
  });
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isReadyToSignup, setIsReadyToSignup] = useState(false);

  const nextStep = () => {
    const goNext = () => {
      setCurrentStepIndex(stepIndex + 1);
      listRef.current.scrollToIndex({
        index: currentStepIndex + 1,
        animated: true,
      });
      setStepIndex(stepIndex + 1);
    };
    switch (stepIndex) {
      case 0:
        if (signupInfos.objective) {
          goNext();
        }
        break;
      case 1:
        if (signupInfos.weight && signupInfos.height) {
          goNext();
        }
        break;
      case 2:
        if (signupInfos.diet) {
          goNext();
        }
        break;
      case 3:
        if (signupInfos.diet) {
          setIsReadyToSignup(true);
        }
        break;
      default:
        break;
    }
  };

  const backToFirstStep = () => {
    listRef.current.scrollToIndex({
      index: 0,
      animated: false,
    });
    setCurrentStepIndex(0);
    setStepIndex(0);
  };
  return !isReadyToSignup ? (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={(ref) => (listRef.current = ref)}
        data={slideList}
        style={{ height: '90%' }}
        keyExtractor={(_, key) => key.toString()}
        renderItem={({ item }) => {
          return (
            <Slide
              data={item}
              index={stepIndex}
              setSignupInfos={setSignupInfos}
              signupInfos={signupInfos}
            />
          );
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

      <View
        style={[
          styles.nextBtnContainer,
          currentStepIndex === 3 ? styles.twoBtn : styles.onlyNextBtn,
        ]}
      >
        {currentStepIndex === 3 && (
          <TouchableOpacity onPress={backToFirstStep}>
            <Text style={styles.btnText}>Modifier</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={nextStep}>
          <Text style={styles.btnText}>
            {stepIndex < slideList.length - 1 ? 'Next Step' : 'Submit'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <View style={styles.signupContainer}>
      <SignupForm />
    </View>
  );
};

export default SignupFlow;

const styles = StyleSheet.create({
  nextBtnContainer: {
    height: '15%',
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 50,
    borderRadius: 20,
    overflow: 'hidden',
  },
  onlyNextBtn: { justifyContent: 'flex-end' },
  twoBtn: {
    justifyContent: 'space-between',
  },
  btnText: {
    fontFamily: 'fira-medium',
    fontSize: 18,
    color: Colors.light,
  },
  signupContainer: {
    height: WindowHeight,
    width: WindowWidth,
    backgroundColor: Colors.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
