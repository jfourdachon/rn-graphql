import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, Text, View, Modal, Alert, Pressable } from 'react-native';

interface Props {
  isToastVisible: boolean;
  setIsToastVisible: Dispatch<SetStateAction<boolean>>;
  toastText: string;
  navigation?: Dispatch<SetStateAction<boolean>>;
}

const Toast = ({ isToastVisible, toastText, setIsToastVisible, navigation }: Props) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={isToastVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setIsToastVisible(!isToastVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{toastText}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setIsToastVisible(!isToastVisible);
                navigation && navigation(false);
              }}
            >
              <Text style={styles.textStyle}>Ok Cool!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  centeredView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
