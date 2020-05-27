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
    marginTop: 10,
    alignSelf: 'center',
    width: '50%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 99999,
    backgroundColor: PRIMARY,
    elevation: 5,
  },
  buttonText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default FormButton;
