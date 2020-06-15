import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {group} from '../api/index';
import Header from '../components/Header';
import {PRIMARY, HEADING, PLACEHOLDER} from '../styles/colors';
import LoadingScreen from '../components/LoadingScreen';

const Events = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    setIsLoading(value => !value);
    getGroups();
  }, []);

  const getGroups = async () => {
    try {
      const response = await group();
      setGroups(response.data.groups);
      setIsLoading(value => !value);
    } catch (error) {
      console.log(error);
    }
  };

  const Group = props => {
    return (
      <TouchableOpacity
        style={styles.groupCard}
        onPress={() =>
          navigation.navigate('Group', {
            // groupName: props.groupName,
            // numberOfParticipants: props.numberOfParticipants,
            // eventId: props.eventId,
          })
        }>
        <Text>{props.groupName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.screenContainer}>
        <Header navigation={navigation} />
        <SafeAreaView style={styles.container}>
          <Text style={styles.heading}>Groups</Text>
          {isLoading ? (
            <LoadingScreen visible={isLoading} />
          ) : (
            <FlatList
              data={groups}
              renderItem={({item}) => <Group groupName={item.name} />}
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
  bubble: {
    width: 55,
    height: 55,
    marginTop: 5,
  },
  headingComponent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '1%',
  },
  heading: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 27,
    paddingLeft: '9%',
  },
  groupCard: {
    paddingHorizontal: '10%',
    paddingVertical: '2%',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: '6%',
  },
  eventHeading: {
    fontSize: 23,
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
    fontSize: 14,
  },
  verticalComponent: {
    marginTop: '2%',
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
    marginTop: '2%',
  },
  eventResponse: {
    fontSize: 16,
    fontWeight: 'bold',
    color: HEADING,
  },
  eventData: {
    marginLeft: 28,
  },
  lottie: {
    width: 70,
    height: 70,
  },
  location: {
    width: 45,
    height: 45,
    marginLeft: -15,
  },
});

export default Events;
