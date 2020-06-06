import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Error = ({error}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff5f5',
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    fontSize: 16,
    color: '#c53030',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Error;
