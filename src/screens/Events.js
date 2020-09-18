import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  RefreshControl,
  FlatList,
  Image,
} from 'react-native';
import {event} from '../api/index';
import Header from '../components/Header';
import LoadingScreen from '../components/LoadingScreen';
import EventCard from '../components/EventCard';
import {HEADING, PRIMARY, SECONDARY, PLACEHOLDER} from '../styles/colors';

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
    setEvents(eventArray);
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
            <Text style={styles.heading}>Events</Text>

            <View style={styles.noResult}>
              <Image
                source={require('../assets/images/no-events.png')}
                style={styles.noResultImage}
              />
              <Text style={styles.noResultText}>
                Looks like you are not in any events.
              </Text>
            </View>
          </SafeAreaView>
        ) : (
          <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>Events</Text>

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
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  heading: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: '6%',
    // paddingLeft: '9%',
  },
  noResult: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultImage: {
    width: 375,
    height: 375,
  },
  noResultText: {
    fontSize: 16,
    marginVertical: '10%',
    color: HEADING,
    textAlign: 'center',
  },
});

export default Events;
