import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SEPARATOR} from '../styles/colors';

const Separator = () => {
  return <View style={styles.underline} />;
};

const styles = StyleSheet.create({
  underline: {
    borderBottomColor: SEPARATOR,
    borderBottomWidth: 1,
  },
});

export default Separator;
