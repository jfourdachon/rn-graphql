import React, { Dispatch, SetStateAction, useMemo } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { SignUpInfos } from '../types';
import { Colors } from '../../../../contants/Colors';
import { KeyboardType } from '../../../../typescript/enums/form';
import DropDown from '../../../UI/DropDown';
import InputText from '../../../UI/InputText';

interface Props {
  setSignupInfos: Dispatch<SetStateAction<SignUpInfos>>;
  signupInfos: SignUpInfos;
}

function range(start: number, end: number) {
  return Array(end - start + 1)
    .fill(null)
    .map((_, idx) => {
      return { label: (start + idx).toString(), value: start + idx };
    });
}

const CurrentShape = ({ signupInfos, setSignupInfos }: Props) => {
  const createHeightSelect = useMemo(() => range(120, 220), []);
  const createWeightSelect = useMemo(() => range(35, 180), []);

  console.log({ createHeightSelect });

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
            <DropDown
              items={createHeightSelect}
              onValueChange={(e) => setHeight(e)}
              value={signupInfos.height}
              placeholder={{
                label: 'Selectionnez votre taille',
                value: null,
              }}
            />
            <Text>cm</Text>
          </View>
        </View>
      </View>
      <View style={styles.column}>
        <View style={styles.colTitleContainer}>
          <Text>Ton poids actuel</Text>
          <View style={styles.inputRow}>
            <DropDown
              items={createWeightSelect}
              onValueChange={(e) => setWeight(e)}
              value={signupInfos.weight}
              placeholder={{
                label: 'Selectionnez votre poids',
                value: null,
              }}
            />
            <Text>Kg</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CurrentShape;

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
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: Dimensions.get('window').width / 4,
  },
});
