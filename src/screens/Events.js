import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  RefreshControl,
  FlatList,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import {event} from '../api/index';
import Header from '../components/Header';
import LoadingScreen from '../components/LoadingScreen';
import EventCard from '../components/EventCard';
import {HEADING, PRIMARY, SECONDARY, PLACEHOLDER} from '../styles/colors';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';

const Events = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // setIsLoading(value => !value);
    const unsubscribe = navigation.addListener('focus', () => {
      getEvents();
      setIsLoading(value => !value);
    });
    return unsubscribe;
  }, [navigation]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getEvents();
    setIsLoading(value => !value);
    setRefreshing(false);
  }, []);

  const getEvents = async () => {
    const response = await event();
    const eventArray = Object.values(response.data.events);

    const currentEvents = [];
    let currentTime = new Date();
    let eventTime;

    for (let e of eventArray) {
      eventTime = new Date(e.schedule);
      console.log(currentTime);
      if (eventTime >= currentTime)
        currentEvents.push(e);
        console.log(currentEvents);
    }
    // console.log(currentEvents);
    setEvents(currentEvents);
    setIsLoading(value => !value);
  };

  return (
    <>
      <View style={styles.screenContainer}>
        <Header navigation={navigation} />
        {isLoading ? (
          <LoadingScreen visible={isLoading} />
        ) : events.length === 0 ? (
          <SafeAreaView
            style={{flex: 1, backgroundColor: '#FFFFFF', padding: 20}}>
            <View style={styles.eventComponent}>
            <Text style={styles.heading}>Events</Text>
            {/* <Icon
              name="search"
              size={40}
              color={'#000'}
              style={styles.hamburger}
            /> */}
            </View>
            
            <View style={styles.noResult}>
              <Image
                source={require('../assets/images/traveling.png')}
                style={styles.noResultImage}
              />
              <Text style={styles.noResultText}>
                Looks like there are no upcoming events
              </Text>
            </View>
            <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate('SelectGroup')
            }>
            <View style={styles.buttonBackground}>
              <Icon
                name="calendar-plus"
                size={30}
                style={styles.icon}
                color={'#FFFFFF'}
              />
            </View>
          </TouchableWithoutFeedback>
          </SafeAreaView>
        ) : (
          <SafeAreaView style={styles.container}>
            <View style={styles.eventComponent}>
            <Text style={styles.heading}>Events</Text>
            {/* <Icon
              name="search"
              size={40}
              color={'#000'}
              style={styles.hamburger}
            /> */}
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
                    hostedById={item.createdBy}
                    groupId={item.group[0]._id}
                    eventName={item.name}
                    schedule={item.schedule}
                    responses={item.responses}
                    location={item.location.locationName}
                    navigation={navigation}
                  />
                )}
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor={PRIMARY}
                  />
                }
              />
            )}
          </SafeAreaView>
        )}
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
    padding: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: '6%',
    // paddingLeft: '9%',
  },
  noResult: {
    flex: 1,
    // justifyContent: 'center',
    marginTop: '15%',
    alignItems: 'center',
  },
  noResultImage: {
    width: 400,
    height: 300,
  },
  noResultText: {
    fontSize: 16,
    marginVertical: '10%',
    color: HEADING,
    textAlign: 'center',
  },
  eventComponent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  icon: {
    alignSelf: 'center',
    marginVertical: '22%',
  },
  buttonBackground: {
    backgroundColor: PRIMARY,
    borderRadius: 70,
    bottom: '5%',
    right: '7%',
    position: 'absolute',
    height: 70,
    width: 70,
    elevation: 5,
  },
});

export default Events;
