import React, { Dispatch, SetStateAction } from 'react';
import {
    Dimensions,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInputChangeEventData,
  View,
} from 'react-native';
import { SignUpInfos } from '..';
import { Colors } from '../../../../contants/Colors';
import { KeyboardType } from '../../../../typescript/enums/form';
import InputText from '../../../UI/InputText';

interface Props {
  setSignupInfos: Dispatch<SetStateAction<SignUpInfos>>;
  signupInfos: SignUpInfos;
}

const CurrentStep = ({ signupInfos, setSignupInfos }: Props) => {
  const setHeight = (e: string) => {
    setSignupInfos((prevState) => ({
      ...prevState,
      height: +e,
    }));
  };

  const setWeight = (e: string) => {
    setSignupInfos((prevState) => ({
      ...prevState,
      weight: +e,
    }));
  };
  return (
    <View style={styles.mainRow}>
      <View style={styles.column}>
        <View style={styles.colTitleContainer}>
          <Text>Ta taille actuelle</Text>
          <View style={styles.inputRow}>
            <InputText
              placeholder='ex: 165...'
              keyboardType={KeyboardType.NumberPad}
              value={signupInfos.height.toString()}
              onChangeText={(e) => setHeight(e)}
            />
            <Text>cm</Text>
          </View>
        </View>
      </View>
      <View style={styles.column}>
        <View style={styles.colTitleContainer}>
          <Text>Ton poids actuel</Text>
          <View style={styles.inputRow}>
            <InputText
              placeholder='ex: 68'
              keyboardType={KeyboardType.NumberPad}
              value={signupInfos.weight.toString()}
              //TODO create method to handle weight
              onChangeText={setWeight}
            />
             <Text>Kg</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CurrentStep;

const styles = StyleSheet.create({
  mainRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colTitleContainer: {
    marginVertical: 15,
  },
  colTitle: {
    fontSize: 18,
    fontFamily: 'fira-medium',
    color: Colors.light,
    textAlign: 'center',
  },
  inputContainer: {},
  inputRow: {
      width: '30%',
      display: 'flex',
      flexDirection: 'row'
  },
  input: {
    width: Dimensions.get('window').width / 4,
  },
});
