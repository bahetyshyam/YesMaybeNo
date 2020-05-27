import React from 'react';
import {PLACEHOLDER} from '../styles/colors';
import {StyleSheet, TextInput} from 'react-native';

const FormInput = ({value, placeholder, ...rest}) => {
  return (
    <TextInput
      value={value}
      style={styles.input}
      placeholder={placeholder}
      numberOfLines={1}
      placeholderTextColor={PLACEHOLDER}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 0,
    marginTop: 5,
    marginBottom: 30,
    borderBottomWidth: 1,
    width: '100%',
    height: 35,
    fontSize: 16,
  },
});

export default FormInput;
