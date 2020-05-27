import React, {useEffect} from 'react';
import AuthNavigator from './src/navigation/AuthNavigator';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    }, []);
  return <AuthNavigator />;
};

export default App;
