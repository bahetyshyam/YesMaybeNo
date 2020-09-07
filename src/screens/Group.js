import React, {useEffect, useState} from 'react';
import LoadingScreen from '../components/LoadingScreen';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from 'react-native';
import {event} from '../api/index';
import Header from '../components/Header';
import EventCard from '../components/EventCard';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import FAIcon from 'react-native-vector-icons/dist/FontAwesome5';
import {PLACEHOLDER, PRIMARY} from '../styles/colors';

const Group = ({route, navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const {groupName, groupId} = route.params;

  useEffect(() => {
    // setIsLoading(value => !value);
    const unsubscribe = navigation.addListener('focus', () => {
      getEvents();
      setIsLoading(value => !value);
    });
    return unsubscribe;
  }, [navigation]);

  const getEvents = async () => {
    const response = await event();
    const eventArray = Object.values(response.data.events);

    const filteredEventArray = eventArray.filter(
      item => item.group[0]._id === groupId,
    );
    setEvents(filteredEventArray);
    setIsLoading(value => !value);
  };

  return (
    <>
      <View style={styles.screenContainer}>
        <Header navigation={navigation} />
        <SafeAreaView style={styles.container}>
          <View style={styles.firstMenu}>
            <View style={styles.groupHeadingComponent}>
              <Image
                source={require('../assets/images/group.jpg')}
                style={styles.userPicture}
              />
              <Text style={styles.heading}>{groupName}</Text>
            </View>
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate('GroupMembers', {
                  groupName: groupName,
                  groupId: groupId,
                })
              }>
              <Icon
                name="keyboard-arrow-right"
                size={35}
                color={PLACEHOLDER}
                style={styles.hamburger}
              />
            </TouchableWithoutFeedback>
          </View>

          {isLoading ? (
            <LoadingScreen visible={isLoading} />
          ) : (
            <FlatList
              data={events}
              renderItem={({item}) => (
                <EventCard
                  groupName={item.group[0].name}
                  numberOfParticipants={item.group[0].members.length}
                  eventId={item._id}
                  eventName={item.name}
                  schedule={item.schedule}
                  responses={item.responses}
                  location={item.location.locationName}
                  navigation={navigation}
                />
              )}
              keyExtractor={item => item._id}
              showsVerticalScrollIndicator={false}
            />
          )}
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate('Create Event', {
                groupName,
                groupId,
              })
            }>
            <View style={styles.buttonBackground}>
              <FAIcon
                name="calendar-plus"
                size={30}
                style={styles.icon}
                color={'#FFFFFF'}
              />
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
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
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: '3%',
  },
  userPicture: {
    width: 80,
    height: 80,
    borderRadius: 70,
  },
  groupHeadingComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: '7%',
  },
  firstMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hamburger: {
    marginTop: '7%',
  },
  icon: {
    alignSelf: 'center',
    marginVertical: '20%',
  },
  buttonBackground: {
    backgroundColor: PRIMARY,
    borderRadius: 70,
    bottom: '5%',
    right: '7%',
    position: 'absolute',
    height: 60,
    width: 60,
    elevation: 5,
  },
});

export default Group;
