import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {UserContext} from '../navigation/AuthNavigator';
import {removeToken, removeUser} from '../utils/asynStorage';

const Home = () => {
  const {user, setUser} = useContext(UserContext);

  const signOut = () => {
    removeToken();
    removeUser();
    setUser(false);
  };

  return (
    <>
      <View style={styles.container}>
        <Text>Home {user.name}</Text>
        <Button title="Sign Out" onPress={() => signOut()} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
