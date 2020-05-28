import React, {useContext} from 'react';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {View, StyleSheet, Text} from 'react-native';
import {PRIMARY} from '../styles/colors';
import {UserContext} from '../navigation/AuthNavigator';
import {signOut} from '../utils/signOut';

const SideBar = props => {
  const {user, setUser} = useContext(UserContext);
  return (
    <>
      <View style={styles.boxContainer}>
        <Text style={styles.userText}>{user.name}</Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Sign Out"
          onPress={() => signOut(setUser)}
          {...props}
        />
      </DrawerContentScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    height: '20%',
    backgroundColor: PRIMARY,
    flexDirection: 'column-reverse',
    padding: 16,
  },
  userText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SideBar;
