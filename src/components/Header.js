import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {PLACEHOLDER} from '../styles/colors';
import HeaderLogo from '../assets/images/logo.svg';

const Header = ({navigation}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.hamburgerTouchableOpacity}
        onPress={() => navigation.openDrawer()}>
        <Icon name="bars" size={32} color={PLACEHOLDER} />
      </TouchableOpacity>
      <View style={styles.logoView}>
        <HeaderLogo />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    padding: 15,
    backgroundColor: '#fff',
    elevation: 5,
  },
  hamburgerView: {},
  logoView: {
    // flexGrow: 1,
    alignItems: 'center',
    width: 310,
    height: 125,
  },
  text: {
    fontSize: 23,
    textAlign: 'center',
  },
});

export default Header;
