import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DIET, SignUpInfos } from '../types';
import { Colors } from '../../../../contants/Colors';
import Touchable from '../../../UI/touchable/Touchable';


interface Props {
  setSignupInfos: Dispatch<SetStateAction<SignUpInfos>>;
  signupInfos: SignUpInfos;
}

const CurrentDiet = ({ signupInfos, setSignupInfos }: Props) => {
  const currentDiet: DIET[] = [
    DIET.VEGETARIAN,
    DIET.VEGAN,
    DIET.FLEX,
    DIET.OTHER,
  ];

  return (
    <View style={styles.objectiveContainer}>
      {currentDiet.map((diet, key) => (
        <View style={styles.btnWrapper} key={key}>
          <Touchable
            onPress={() =>
              setSignupInfos((prevState) => ({
                ...prevState,
                diet: diet,
              }))
            }
          >
            <View
              style={
                signupInfos.diet !== diet
                  ? styles.objectiveBtn
                  : styles.selectedBtn
              }
            >
              <Text
                style={
                  signupInfos.diet !== diet
                    ? styles.objectiveText
                    : styles.selectedText
                }
              >
                {diet}
              </Text>
            </View>
          </Touchable>
        </View>
      ))}
    </View>
  );
};

export default CurrentDiet;

const styles = StyleSheet.create({
  objectiveContainer: {
    height: '65%',
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
