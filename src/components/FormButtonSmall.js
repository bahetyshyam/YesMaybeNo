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
    marginTop: 15,
    alignSelf: 'center',
    width: '42%',
    height: 42,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: PRIMARY,
    elevation: 3,
    alignSelf: 'flex-end'
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default FormButtonSmall;
