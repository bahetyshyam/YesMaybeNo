import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, SafeAreaView, FlatList, TouchableOpacity} from 'react-native';
import {UserContext} from '../navigation/AuthNavigator';
import {getToken, getUser} from '../utils/asynStorage';
import {event} from '../api/index';
import Header from '../components/Header';
import {ScrollView } from 'react-native-gesture-handler';
import {signOut} from '../utils/signOut';
import LocationLogo from '../assets/images/Location.svg';
import { PRIMARY, HEADING, PLACEHOLDER } from '../styles/colors';
import Yes from '../assets/images/Green bubble.svg';
import Maybe from '../assets/images/Grey bubble.svg';
import No from '../assets/images/Red bubble.svg';
import LoadingScreen from '../components/LoadingScreen';

const Home = ({navigation}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setIsLoading((value) => !value);
    getEvent();
  }, []);

  const getEvent = async () => { 
    const response = await event();
    const eventArray = Object.values(response.data.events);
    setEvents(eventArray);
    setIsLoading((value) => !value);
  }

  const convertDate = (dbDate) => {
    const date = new Date(dbDate);
    return date.toDateString().substring(4);
  };

  const getEventTime = (dbDate) => {
    const time = new Date(dbDate);
    return time.toLocaleTimeString().substring(0, 5);
  }

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

  const Event = (props) => {
    return (
      <TouchableOpacity style={styles.eventCard}
      onPress={() => navigation.navigate('Event')}>
        <View style={styles.headingComponent}>
          <Text style={styles.eventHeading}>{props.eventName}</Text>
          <View style={styles.bubble}><No /></View>
        </View>
        <View style={styles.horizontalComponent}>
          <LocationLogo style={styles.location} />
          <Text style={styles.eventLocation}>No location</Text>
        </View>
        <View style={styles.eventData}>
          <View style={styles.verticalComponent}>
            <Text style={styles.eventSchedule}>{convertDate(props.schedule)}</Text>
            <Text style={styles.eventSchedule}>{getEventTime(props.schedule)}</Text>
          </View>
          <Text style={styles.eventGroup}>{props.groupName}</Text>
          <View style={styles.responseComponent}>
            <Text style={styles.eventResponse}>Response</Text>
            <View style={styles.bubble}><Yes /></View>
          </View>
        </View>
      </TouchableOpacity>
    )
  };

  return (
    <>
      <View style={styles.screenContainer}>
        <Header navigation={navigation} />
          <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>Events</Text>

            {isLoading ? (<LoadingScreen visible={isLoading} />)
            :
            (<FlatList
              data={events}
              renderItem={({item}) => <Event eventName={item.name} schedule={item.schedule} groupName={item.group[0].name} />}
              keyExtractor={item => item._id}
              showsVerticalScrollIndicator ={false}>
                
            </FlatList>
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
    backgroundColor: '#fff',
    padding: 20,
  },
  bubble: {
    width: 55,
    height: 55,
    marginTop: 5,
  },
  headingComponent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '4%',
  },
  heading: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 30,
    paddingLeft: '9%'
  },
  eventCard: {
    padding: '10%',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: '10%',
  },
  eventHeading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginRight: '3%',
  },
  horizontalComponent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventLocation: {
    color: PRIMARY,
    fontSize: 16,
  },
  verticalComponent: {
    marginTop: '3%',
    marginBottom: '8%',
    
  },
  eventSchedule: {
    fontSize: 16,
    fontWeight: 'bold',
    color: HEADING,
    paddingTop: 5,
  },
  eventGroup: {
    fontSize: 14,
    color: PLACEHOLDER,
  },
  responseComponent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '5%',
  },
  eventResponse: {
    fontSize: 16,
    fontWeight: 'bold',
    color: HEADING,
  },
  eventData: {
    marginLeft: 28
  }, 
  lottie: {
    width: 70,
    height: 70,
  },
  location: {
    width: 45,
    height: 45,
    marginLeft: -15,
  }
});

export default Home;
