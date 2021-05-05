import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../../contants/Colors';
import Touchable from '../../../UI/touchable/Touchable';

enum OBJECTIVES {
  UP = 'Prendre du poids',
  DOWN = 'Perder du poids',
  NULL = "Pas d'objectif",
}

const ObjectiveStep = () => {
  const [objective, setObjective] = useState<OBJECTIVES | null>(null);
  const weigthObj: OBJECTIVES[] = [
    OBJECTIVES.DOWN,
    OBJECTIVES.UP,
    OBJECTIVES.NULL,
  ];

  return (
    <View style={styles.objectiveContainer}>
      {weigthObj.map((object, key) => (
        <View style={styles.btnWrapper} key={key}>
          <Touchable onPress={() => setObjective(object)}>
            <View
              style={
                objective !== object ? styles.objectiveBtn : styles.selectedBtn
              }
            >
              <Text
                style={
                  objective !== object
                    ? styles.objectiveText
                    : styles.selectedText
                }
              >
                {object}
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
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
  },
  objectiveBtn: {
    minWidth: 240,
    width: '100%',
  },
  selectedBtn: {
    minWidth: 240,
    width: '100%',
    backgroundColor: 'gray',
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
