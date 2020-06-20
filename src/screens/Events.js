import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView, FlatList} from 'react-native';
import {event} from '../api/index';
import Header from '../components/Header';
import {PRIMARY, HEADING, PLACEHOLDER} from '../styles/colors';
import LoadingScreen from '../components/LoadingScreen';
import EventCard from '../components/EventCard';

const Events = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setIsLoading(value => !value);
    getEvent();
  }, []);

  const getEvent = async () => {
    const response = await event();
    const eventArray = Object.values(response.data.events);
    setEvents(eventArray);
    setIsLoading(value => !value);
  };

  // const maxResponses = () => {
  //   if (eventData.yes.length === eventData.no.length && eventData.no.length === eventData.maybe.length)
  //     bubble = undefined;
  //   else {
  //     if (eventData.yes.length > eventData.no.length && eventData.yes.length > eventData.maybe.length)
  //     bubble = '../assets/images/red.svg';
  //     else if (eventData.yes.length > eventData.no.length && eventData.yes.length > eventData.maybe.length)
  //       bubble = '../assets/images/red.svg';
  //     else if (eventData.yes.length > eventData.no.length && eventData.yes.length > eventData.maybe.length)
  //       bubble = '../assets/images/red.svg';
  //     else
  //       bubble = undefined;
  //   }
  //   return bubble;
  // }

  return (
    <>
      <View style={styles.screenContainer}>
        <Header navigation={navigation} />
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
                  eventName={item.name}
                  schedule={item.schedule}
                  responses={item.responses}
                  navigation={navigation}
                />
              )}
              keyExtractor={item => item._id}
              showsVerticalScrollIndicator={false}
            />
          )}
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
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 27,
    paddingLeft: '9%',
  },
});

export default Events;
