import React, {useState, useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {PRIMARY} from '../styles/colors';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthNavigator';
import {signIn} from '../api/index';
import {storeToken, storeUser} from '../utils/asynStorage';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {setUser} = useContext(AuthContext);

  const handleSignIn = async (email, password) => {
    try {
      const response = await signIn(email, password);
      storeToken(response.data.token);
      storeUser(response.data.user);
      setUser(response.data.user);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign In</Text>
      <View style={styles.box}>
        <Text style={styles.label}>Email</Text>
        <FormInput
          value={email}
          onChangeText={userEmail => setEmail(userEmail)}
          placeholder={'jackryan@gmail.com'}
        />
        <Text style={styles.label}>Password</Text>
        <FormInput
          value={password}
          onChangeText={userPassword => setPassword(userPassword)}
          placeholder={'Enter Password'}
          secureTextEntry={true}
        />
        <FormButton
          onPress={() => handleSignIn(email, password)}
          buttonTitle={'Sign In'}
        />
      </View>
      <TouchableOpacity
        style={styles.signUp}
        onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signUpText}>Create an account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '20%',
    paddingBottom: '20%',
    justifyContent: 'center',
  },
  heading: {
    marginLeft: 15,
    marginBottom: 15,
    fontSize: 32,
    fontWeight: 'bold',
    color: PRIMARY,
  },
  box: {
    paddingHorizontal: '10%',
    paddingVertical: '15%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  label: {
    fontSize: 24,
  },
  signUp: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: PRIMARY,
  },
});

export default SignIn;
