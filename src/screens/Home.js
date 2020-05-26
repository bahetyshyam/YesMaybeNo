import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../navigation/AuthNavigator';

const Home = () => {
  const user = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Home {user}</Text>
    </View>
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
