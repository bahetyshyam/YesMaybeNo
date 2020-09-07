import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import FirstIntroSheet from '../screens/FirstIntroSheet';
import SecondIntroSheet from '../screens/SecondIntroSheet';
import ThirdIntroSheet from '../screens/ThirdIntroSheet';

const Stack = createStackNavigator();

const IntroductoryStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FirstIntroSheet" headerMode="none">
        <Stack.Screen name="FirstIntroSheet" component={FirstIntroSheet} />
        <Stack.Screen name="SecondIntroSheet" component={SecondIntroSheet} />
        <Stack.Screen name="ThirdIntroSheet" component={ThirdIntroSheet} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default IntroductoryStack;
