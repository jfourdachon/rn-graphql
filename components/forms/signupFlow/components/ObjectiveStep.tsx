import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { OBJECTIVES, SignUpInfos } from '../types';
import { Colors } from '../../../../contants/Colors';
import Touchable from '../../../UI/touchable/Touchable';



interface Props {
    setSignupInfos: Dispatch<SetStateAction<SignUpInfos>>
    signupInfos: SignUpInfos
}

const ObjectiveStep = ({setSignupInfos, signupInfos}: Props) => {
  const weigthObjectives: OBJECTIVES[] = [
    OBJECTIVES.DOWN,
    OBJECTIVES.UP,
    OBJECTIVES.HEALTH_FOOD,
  ];

  return (
    <View style={styles.objectiveContainer}>
      {weigthObjectives.map((objective, key) => (
        <View style={styles.btnWrapper} key={key}>
          <Touchable onPress={() => setSignupInfos(prevState => ({...prevState, objective: objective}))}>
            <View
              style={
                signupInfos.objective !== objective ? styles.objectiveBtn : styles.selectedBtn
              }
            >
              <Text
                style={
                    signupInfos.objective !== objective
                    ? styles.objectiveText
                    : styles.selectedText
                }
              >
                {objective}
              </Text>
            </View>
          </Touchable>
        </View>
      ))}
    </View>
  );
};

export default ObjectiveStep;

const styles = StyleSheet.create({
  objectiveContainer: {
    height: '45%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  btnWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: Colors.lightGrey,
    backgroundColor: 'white',
  },
  objectiveBtn: {
    minWidth: 280,
    width: '100%',
  },
  selectedBtn: {
    minWidth: 280,
    width: '100%',
    backgroundColor: Colors.primaryDark,
  },
  objectiveText: {
    fontSize: 18,
    paddingVertical: 10,
    textAlign: 'center',
    fontFamily: 'fira-medium',
    color: Colors.primaryLight,
  },
  selectedText: {
    fontSize: 18,
    paddingVertical: 10,
    textAlign: 'center',
    fontFamily: 'fira-medium',
    color: Colors.light,
  },
});
