import React from 'react';
import {TouchableOpacity, TextInput, Text, StyleSheet} from 'react-native';
import {PRIMARY} from '../styles/colors';

const FormButtonSmall = ({buttonTitle, ...rest}) => {
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
    width: '35%',
    height: 48,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: PRIMARY,
    elevation: 3,
    alignSelf: 'flex-end',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default FormButtonSmall;
