import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Button, ScrollView} from 'react-native';
import Header from '../components/Header';

const Dashboard = ({navigation}) => {
  //   useEffect(() => {
  //     console.log("Settings page mounted");
  //   }, []);

  return (
    <>
      <View style={styles.screenContainer}>
        <Header navigation={navigation} />
        <ScrollView>
          <View style={styles.container}>
            <Text>Dashboard</Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Dashboard;
