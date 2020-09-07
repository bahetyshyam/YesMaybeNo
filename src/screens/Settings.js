import React, {useEffect, useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Image,
  Switch,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';
import {UserContext} from '../navigation/AppNavigator';
import {HEADING, PRIMARY} from '../styles/colors';
import {Dimensions} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';

const Settings = ({navigation}) => {
  const {user, setUser} = useContext(UserContext);
  const [eventIsEnabled, setEventIsEnabled] = useState(false);
  const [maybeIsEnabled, setMaybeIsEnabled] = useState(false);
  const toggleEventSwitch = () =>
    setEventIsEnabled(previousState => !previousState);
  const toggleMaybeSwitch = () =>
    setMaybeIsEnabled(previousState => !previousState);

  useEffect(() => {
    console.log('Settings page mounted');
  }, []);

  return (
    <>
      <View style={styles.screenContainer}>
        <Header navigation={navigation} />
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.heading}>Settings</Text>
            <View style={styles.boxContainer}>
              <Image
                source={require('../assets/images/user-3.jpg')}
                style={styles.userPicture}
              />
              <View style={styles.userInfo}>
                <Text style={styles.userText}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
              </View>
            </View>

            <Text style={styles.subHeading}>Notifications</Text>
            <View style={styles.notificationSettings}>
              <View style={styles.setting}>
                <Text style={styles.settingsText}>
                  Get notified an hour before the event is due
                </Text>
                <Switch
                  trackColor={{false: '#767577', true: PRIMARY}}
                  thumbColor={'#f4f3f4'}
                  onValueChange={toggleEventSwitch}
                  value={eventIsEnabled}
                  style={styles.toggle}
                />
              </View>
              <View style={styles.setting}>
                <Text style={styles.settingsText}>
                  Get notified an hour before the event when responded maybe
                </Text>
                <Switch
                  trackColor={{false: '#767577', true: PRIMARY}}
                  thumbColor={'#f4f3f4'}
                  onValueChange={toggleMaybeSwitch}
                  value={maybeIsEnabled}
                  style={styles.toggle}
                />
              </View>
            </View>
            <Text style={styles.about}>About the app</Text>
            <TouchableOpacity
              activeOpacity={0.2}
              onPress={() => navigation.navigate('FirstIntroSheet')}>
              <Text style={styles.about}>Help</Text>
            </TouchableOpacity>
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
    backgroundColor: '#f8f8f8',
    padding: '7%',
    height: Dimensions.get('window').height,
  },
  boxContainer: {
    padding: 20,
    flexDirection: 'row',
  },
  userInfo: {
    justifyContent: 'center',
  },
  userText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '5%',
    color: HEADING,
  },
  userEmail: {
    fontSize: 15,
    marginTop: '5%',
  },
  userPicture: {
    width: 100,
    height: 100,
    marginRight: '10%',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: '7%',
  },
  subHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: '10%',
    marginVertical: '5%',
    paddingLeft: '5%',
  },
  notificationSettings: {
    paddingHorizontal: '5%',
    paddingVertical: '5%',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: '10%',
  },
  setting: {
    marginVertical: '5%',
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  settingsText: {
    fontSize: 16,
  },
  about: {
    marginTop: '5%',
    fontSize: 18,
    color: HEADING,
    fontWeight: 'bold',
    paddingLeft: '5%',
  },
  toggle: {
    marginLeft: '5%',
  },
});

export default Settings;
