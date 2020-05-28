import React, {useContext} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {UserContext} from '../navigation/AuthNavigator';
import {getToken, getUser} from '../utils/asynStorage';
import {event} from '../api/index';
import Header from '../components/Header';
import {ScrollView} from 'react-native-gesture-handler';
import {signOut} from '../utils/signOut';

const Home = ({navigation}) => {
  const {user, setUser} = useContext(UserContext);

  const getEvent = async () => {
    try {
      getToken();
      getUser();
      const response = await event();
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <View style={styles.screenContainer}>
        <Header navigation={navigation} />
        <ScrollView>
          <View style={styles.container}>
            <Text>Home {user.name}</Text>
            <Text>Home {user._id}</Text>
            <Text style={{fontSize: 30}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              venenatis laoreet nisl vel ultrices. Pellentesque eget metus vel
              est tempor facilisis vitae quis augue. Suspendisse a metus semper,
              convallis sem eget, consequat enim. Etiam sit amet massa eget
              turpis molestie accumsan. Curabitur fermentum purus accumsan nisl
              laoreet, ut fringilla leo egestas. Proin ipsum metus, pellentesque
              nec velit sit amet, hendrerit dictum magna. Etiam quam sapien,
              dignissim commodo dolor ut, egestas suscipit lorem. Vestibulum
              eget mi id ante consequat vulputate et in ex. Donec eget egestas
              lectus. Maecenas ac enim sed risus auctor lobortis. Etiam sagittis
              turpis a vestibulum tincidunt. Duis non est sodales, dapibus diam
              at, pharetra magna. Donec fermentum sapien lacus, eu finibus dolor
              ma
            </Text>
            <Button title="Events" onPress={() => getEvent()} />
            <Button title="Sign Out" onPress={() => signOut(setUser)} />
            <Button
              title="Open Drawer"
              onPress={() => navigation.openDrawer()}
            />
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

export default Home;
