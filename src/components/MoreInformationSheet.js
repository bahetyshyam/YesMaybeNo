import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {HEADING, PRIMARY} from '../styles/colors';
import {deleteEvent} from '../api/index';
import {getUser} from '../utils/asynStorage';
import FormButtonSmall from '../components/FormButtonSmall';

const MoreInformationSheet = ({
  reference,
  eventName,
  eventId,
  hostedBy,
  hostedById,
  groupName,
  numberOfParticipants,
  navigation,
}) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    getLoggedInId();
  }, []);

  const getLoggedInId = async () => {
    const userLoggedIn = await getUser();
    if (userLoggedIn._id === hostedById) {
      setUserLoggedIn(true);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      const response = await deleteEvent(eventId);
      navigation.navigate('Events');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RBSheet
      ref={reference}
      closeOnDragDown={true}
      closeOnPressMask={true}
      animationType={'slide'}
      openDuration={1}
      closeDuration={1}
      customStyles={{
        draggableIcon: {
          backgroundColor: HEADING,
        },
        container: {
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          height: '45%',
        },
      }}>
      <ScrollView style={styles.mainContainer}>
        <Text style={styles.eventHeading}>{eventName}</Text>
        <Text style={styles.eventGroup}>Hosted by {hostedBy}</Text>
        <Text style={styles.eventGroup}>Hosted on {groupName}</Text>
        <Text style={styles.eventGroup}>
          Number of participants are {numberOfParticipants}
        </Text>
        {userLoggedIn ? (
          <FormButtonSmall
            onPress={() => {
              handleDeleteEvent();
            }}
            buttonTitle={'Delete'}
          />
        ) : null}
      </ScrollView>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: '10%',
  },
  eventHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: '8%',
  },
  eventGroup: {
    fontSize: 16,
    paddingBottom: '4%',
  },
});

export default MoreInformationSheet;
