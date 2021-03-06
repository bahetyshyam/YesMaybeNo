import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {PRIMARY} from '../styles/colors';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import Error from '../components/Error';
import {UserContext} from '../navigation/AppNavigator';
import {signIn} from '../api/index';
import {storeToken, storeUser} from '../utils/asynStorage';
import LoadingScreen from '../components/LoadingScreen';
import HeaderLogo from '../assets/images/logo.svg';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {setUser} = useContext(UserContext);

  const handleSignIn = async (email, password) => {
    //Validation Check
    if (!email || !password) {
      setError('Please enter your Email/Password');
      return;
    }
    setIsLoading(value => !value);

    //Calling the Sign In API
    try {
      const response = await signIn(email, password);
      storeToken(response.data.token);
      storeUser(response.data.user);
      setUser(response.data.user);
      setIsLoading(value => !value);
    } catch (error) {
      setIsLoading(value => !value);
      setError(error.response.data.message);
    }
  };

  return (
    <View style={styles.container}>
      <LoadingScreen visible={isLoading} />
      <View style={styles.logoView}>
        <HeaderLogo />
      </View>
      <Text style={styles.heading}>Sign in</Text>
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
        {error ? <Error error={error} /> : null}
        <FormButton
          onPress={() => {
            handleSignIn(email, password);
          }}
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
    backgroundColor: '#f8f8f8',
    paddingLeft: '5%',
    paddingRight: '5%',
    // paddingTop: '20%',
    paddingBottom: '20%',
    justifyContent: 'center',
  },
  heading: {
    marginLeft: 15,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold',
    color: PRIMARY,
    paddingHorizontal: '5%',
  },
  box: {
    paddingTop: '15%',
    paddingRight: '10%',
    paddingBottom: '5%',
    paddingLeft: '10%',
    backgroundColor: '#fff',
    borderRadius: 10,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 1},
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 7,
  },
  label: {
    fontSize: 16,
  },
  signUp: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: PRIMARY,
  },
  logoView: {
    width: 310,
    height: 140,
    alignSelf: 'center'
  },
});

export default SignIn;
