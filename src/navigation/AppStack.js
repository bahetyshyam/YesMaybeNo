import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SideBar from '../components/SideBar';
import Home from '../screens/Home';
import Groups from '../screens/Groups';
import Settings from '../screens/Settings';
import {PRIMARY} from '../styles/colors';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={props => <SideBar {...props} />}
        drawerContentOptions={{
          activeTintColor: '#fff',
          activeBackgroundColor: PRIMARY,
          inactiveTintColor: '#000',
          itemStyle: {
            marginHorizontal: 0,
            paddingLeft: 10,
            borderRadius: 0,
          },
          labelStyle: {
            fontSize: 18,
          },
        }}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Groups" component={Groups} />
        <Drawer.Screen name="Settings" component={Settings} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
