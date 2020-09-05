import React from 'react';
import {TouchableOpacity, TextInput, Text, StyleSheet} from 'react-native';
import {PRIMARY} from '../styles/colors';

const FormButton = ({buttonTitle, ...rest}) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 25,
    alignSelf: 'center',
    width: '100%',
    height: 55,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: PRIMARY,
    elevation: 5,
  },
  buttonText: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default FormButton;
