import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SignUpInfos } from '..';
import { Colors } from '../../../../contants/Colors';


interface Props {
    signupInfos: SignUpInfos;
  }

const Recap = ({signupInfos}: Props) => {
  return (
    <View style={styles.mainCol}>
      <View style={styles.stepContainer}>
        {/* <Text style={styles.stepTitle}>Objectif</Text> */}
        <View style={styles.row}>
          <Text style={styles.text}>Ton objectif:</Text>
          <Text style={styles.text}>{signupInfos.objective}</Text>
        </View>
      </View>
      <View style={styles.stepContainer}>
        {/* <Text style={styles.stepTitle}></Text> */}
        <View style={styles.row}>
          <Text style={styles.text}>Ton poids:</Text>
          <Text style={styles.text}>{signupInfos.weight} kg</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Ta taille:</Text>
          <Text style={styles.text}>{signupInfos.height} cm</Text>
        </View>
      </View>
      <View style={styles.stepContainer}>
        {/* <Text style={styles.stepTitle}></Text> */}
        <View style={styles.row}>
          <Text style={styles.text}>Ton régime actuel:</Text>
          <Text style={styles.text}>{signupInfos.diet}</Text>
        </View>
      </View>
    </View>
  );
};

export default Recap;

const styles = StyleSheet.create({
  mainCol: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: 60
  },
  stepContainer: {},
  stepTitle: {
    fontFamily: 'fira-medium',
    fontSize: 18,
    marginBottom: 10
  },
  row: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginVertical: 10
  },
  text: {
    color: Colors.light,
    fontFamily: 'fira-medium',
    fontSize: 18,
    marginRight: 10
  },
});
