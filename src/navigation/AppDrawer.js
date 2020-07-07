import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {PRIMARY} from '../styles/colors';
import SideBar from '../components/SideBar';
import Events from '../screens/Events';
import Groups from '../screens/Groups';
import Settings from '../screens/Settings';
import Event from '../screens/Event';
import Group from '../screens/Group';
import CreateEvent from '../screens/CreateEvent';
import CreateGroup from '../screens/CreateGroup';

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

const GroupStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Groups"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Groups" component={Groups} />
      <Stack.Screen name="Group" component={Group} />
      <Stack.Screen name="Event" component={Event} />
      <Stack.Screen name="CreateGroup" component={CreateGroup} />
      <Stack.Screen name="Create Event" component={CreateEvent} />
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
        <Drawer.Screen name="Events" component={EventStack} />
        <Drawer.Screen name="Groups" component={GroupStack} />
        <Drawer.Screen name="Settings" component={Settings} />

        {/* <Drawer.Screen name="Root" component={Root} /> */}
        {/* <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Event" component={Event} />
        </Stack.Navigator> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppDrawer;
