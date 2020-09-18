import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {PRIMARY, HEADING, PLACEHOLDER, SEPARATOR} from '../styles/colors';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import Error from '../components/Error';
import {UserContext} from '../navigation/AppNavigator';
import {signIn} from '../api/index';
import {storeToken, storeUser} from '../utils/asynStorage';
import LoadingScreen from '../components/LoadingScreen';
import HeaderLogo from '../assets/images/logo.svg';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

const SignInWithGoogle = ({navigation}) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '776265301392-9uql48a5l7lbejp1a35pkq0idc8jhu6d.apps.googleusercontent.com', // client ID of type WEB for your server(needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: '', // [Android] specifies an account name on the device that should be used
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
      // console.log(userInfo);
      setError(null);
      setIsLoggedIn(true);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // when user cancels sign in process,
        Alert.alert('Process Cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // when in progress already
        Alert.alert('Process in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // when play services not available
        Alert.alert('Play services are not available');
      } else {
        // some other error
        Alert.alert('Something else went wrong... ', error.toString());
        setError(error);
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setIsLoggedIn(false);
    } catch (error) {
      Alert.alert('Something else went wrong... ', error.toString());
    }
  };

  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      setUserInfo(userInfo);
      console.log(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // when user hasn't signed in yet
        Alert.alert('Please Sign in');
        setIsLoggedIn(false);
      } else {
        Alert.alert('Something else went wrong... ', error.toString());
        setIsLoggedIn(false);
      }
    }
  };

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
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => signIn()}>
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
