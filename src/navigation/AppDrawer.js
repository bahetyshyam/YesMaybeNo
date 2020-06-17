import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import SideBar from '../components/SideBar';
import Events from '../screens/Events';
import Groups from '../screens/Groups';
import Settings from '../screens/Settings';
import Event from '../screens/Event';
import {PRIMARY} from '../styles/colors';
import CreateEvent from '../screens/CreateEvent';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const EventStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Events"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Events" component={Events} />
      <Stack.Screen name="Event" component={Event} />
    </Stack.Navigator>
  );
};

const AppDrawer = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="EventStack"
        backBehavior="initialRoute"
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
        {/* <Drawer.Screen name="Home" component={Home} /> */}
        <Drawer.Screen name="Home" component={EventStack} />
        <Drawer.Screen name="Groups" component={Groups} />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen name="Create Event" component={CreateEvent} />
        {/* <Drawer.Screen name="Root" component={Root} /> */}
        {/* <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Event" component={Event} />
        </Stack.Navigator> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppDrawer;
