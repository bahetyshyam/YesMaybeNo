import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {PRIMARY, HEADING, PLACEHOLDER, SEPARATOR} from '../styles/colors';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import Error from '../components/Error';
import {UserContext} from '../navigation/AppNavigator';
import {signIn} from '../api/index';
import {storeToken, storeUser} from '../utils/asynStorage';
import LoadingScreen from '../components/LoadingScreen';
import HeaderLogo from '../assets/images/logo.svg';

const SignInWithGoogle = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoView}>
        <HeaderLogo />
      </View>

      <Image
        source={require('../assets/images/login.png')}
        style={styles.loginImage}
      />

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Sign in with Google</Text>
          <View style={styles.logoBackground}>
            <Image
              source={require('../assets/images/google.png')}
              style={styles.googleLogo}
            />
          </View>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: '10%',
          }}>
          <View style={{flex: 1, height: 2, backgroundColor: SEPARATOR}} />
          <View>
            <Text
              style={{
                textAlign: 'center',
                marginHorizontal: '10%',
                fontSize: 20,
                fontWeight: 'bold',
                color: PLACEHOLDER,
              }}>
              Or
            </Text>
          </View>
          <View style={{flex: 1, height: 2, backgroundColor: SEPARATOR}} />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.buttonTextEmail}>Sign in with email</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoView: {
    width: 310,
    height: 140,
  },
  loginImage: {
    width: 300,
    height: 400,
    marginVertical: '-5%',
  },
  buttons: {
    paddingVertical: '10%',
    paddingHorizontal: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: '5%',
    width: '100%',
    alignItems: 'center',
    height: 70,
    paddingLeft: '15%',
    paddingVertical: '5%',
    paddingRight: '5%',
    justifyContent: 'space-between',
    borderRadius: 10,
    backgroundColor: PRIMARY,
    elevation: 5,
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonTextEmail: {
    fontSize: 20,
    fontWeight: 'bold',
    color: PRIMARY,
  },
  logoBackground: {
    backgroundColor: '#fff',
    width: '30%',
    height: '100%',
    borderRadius: 5,
    marginLeft: '20%',
    elevation: 5,
  },
  googleLogo: {
    width: 30,
    height: 30,
    alignSelf: 'center',
    marginTop: '15%',
  },
});

export default SignInWithGoogle;
