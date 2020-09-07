import React, {useContext} from 'react';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {View, StyleSheet, Text, Image} from 'react-native';
import {PRIMARY} from '../styles/colors';
import {UserContext} from '../navigation/AppNavigator';
import {signOut} from '../utils/signOut';

const SideBar = props => {
  const {user, setUser} = useContext(UserContext);
  return (
    <>
      <View style={styles.boxContainer}>
        <Image
          source={require('../assets/images/user-3.jpg')}
          style={styles.userPicture}
        />
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
    height: '27%',
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  userText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: '5%',
  },
  userPicture: {
    width: 100,
    height: 100,
  },
});

export default SideBar;
