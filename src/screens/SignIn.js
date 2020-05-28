import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import {PRIMARY} from '../styles/colors';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthNavigator';
import {signIn} from '../api/index';
import {storeToken, storeUser} from '../utils/asynStorage';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const {setUser} = useContext(AuthContext);

  const handleSignIn = async (email, password) => {
    setVisible(!visible);
    try {
      const response = await signIn(email, password);
      storeToken(response.data.token);
      storeUser(response.data.user);
      setUser(response.data.user);
      setVisible(visible);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <View style={styles.container}>
       <AnimatedLoader
        visible={visible}
        overlayColor="rgba(83, 83, 83,0.90)"
        source={require("./loading animation.json")}
        animationStyle={styles.lottie}
        speed={1}
      />
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
          onPress={() => {handleSignIn(email, password);}}
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
    paddingHorizontal: '5%',
  },
  box: {
    // paddingHorizontal: '10%',
    // paddingVertical: '15%',
    paddingTop: '15%',
    paddingRight: '10%',
    paddingBottom: '7%',
    paddingLeft: '10%',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  label: {
    fontSize: 21,
  },
  signUp: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: PRIMARY,
  },
  lottie: {
    width: 100,
    height: 100,
  }
});

export default SignIn;
