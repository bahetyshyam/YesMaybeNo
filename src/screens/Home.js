import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {UserContext} from '../navigation/AuthNavigator';
import {removeToken, removeUser, getToken, getUser} from '../utils/asynStorage';
import {event} from '../api/index';

const Home = () => {
  const {user, setUser} = useContext(UserContext);

  const signOut = () => {
    removeToken();
    removeUser();
    setUser(false);
  };

  const getEvent = async () => {
    try {
      getToken();
      getUser();
      const response = await event(getToken());
      console.log(response);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text>Home {user.name}</Text>
        <Text>Home {user._id}</Text>
        <Button title="Events" onPress={() => getEvent()} />
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
