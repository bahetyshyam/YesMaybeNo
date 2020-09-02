import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {PRIMARY, PLACEHOLDER} from '../styles/colors';

const CancelButtonSmall = ({buttonTitle, ...rest}) => {
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
    height: 48,
    // padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: PLACEHOLDER,
    elevation: 3,
    // alignSelf: 'flex-start',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default CancelButtonSmall;
