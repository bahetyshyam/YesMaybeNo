import React from 'react';
import {PLACEHOLDER, SEPARATOR} from '../styles/colors';
import {StyleSheet, TextInput} from 'react-native';

const FormInput = ({value, placeholder, ...rest}) => {
  return (
    <TextInput
      value={value}
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={PLACEHOLDER}
      underlineColorAndroid={SEPARATOR}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 0,
    marginTop: 5,
    marginBottom: 35,
    width: '100%',
    height: 50,
    fontSize: 16,
    color: '#000'
  },
});

export default FormInput;
