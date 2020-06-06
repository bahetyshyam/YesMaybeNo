import React, {useState, useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {PRIMARY, HEADING} from '../styles/colors';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import Error from '../components/Error';
import {UserContext} from '../navigation/AuthNavigator';
import {signUp} from '../api/index';
import {storeToken, storeUser} from '../utils/asynStorage';
import LoadingScreen from '../components/LoadingScreen';

const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {setUser} = useContext(UserContext);

  const handleSignUp = async (name, email, password) => {
    //Validation Check
    if (!name || !email || !password) {
      setError('Please enter all the details');
      return;
    }
    setIsLoading(value => !value);
    try {
      const response = await signUp(name, email, password);
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
      <Text style={styles.heading}>Get started</Text>
      <View style={styles.box}>
        <Text style={styles.label}>Name</Text>
        <FormInput
          value={name}
          onChangeText={userName => setName(userName)}
          placeholder={'Jack Ryan'}
        />
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
          onPress={() => handleSignUp(name, email, password)}
          buttonTitle={'Sign Up'}
        />
      </View>
      <TouchableOpacity
        style={styles.signIn}
        onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.signInText}>
          Already have an account?<Text style={styles.signInNav}> Sign In</Text>
        </Text>
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
    paddingHorizontal: '5%',
  },
  box: {
    paddingTop: '15%',
    paddingRight: '10%',
    paddingBottom: '7%',
    paddingLeft: '10%',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  label: {
    fontSize: 21,
  },
  signIn: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: HEADING,
  },
  signInNav: {
    fontSize: 17,
    fontWeight: 'bold',
    color: PRIMARY,
  },
});

export default SignUp;
