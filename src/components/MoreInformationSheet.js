import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {HEADING, PRIMARY} from '../styles/colors';
import deleteEvent from '../api/index';
import FormButtonSmall from '../components/FormButtonSmall';

const MoreInformationSheet = ({
  reference,
  eventName,
  eventId,
  hostedBy,
  groupName,
  numberOfParticipants,
  // navigation,
}) => {
  const handleDeleteEvent = async () => {
    const response = await deleteEvent(eventId);
    // navigation.navigate('Events');
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
          borderRadius: 10,
          height: '45%',
        },
      }}>
      <View style={styles.mainContainer}>
        <Text style={styles.eventHeading}>{eventName}</Text>
        <Text style={styles.eventGroup}>Hosted by {hostedBy}</Text>
        <Text style={styles.eventGroup}>Hosted on {groupName}</Text>
        <Text style={styles.eventGroup}>
          Number of participants are {numberOfParticipants}
        </Text>
        <FormButtonSmall
          onPress={() => {
            handleDeleteEvent();
          }}
          buttonTitle={'Delete'}
        />
      </View>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: '10%',
  },
  eventHeading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: '8%',
  },
  eventGroup: {
    fontSize: 16,
    paddingBottom: '4%',
  },
});

export default MoreInformationSheet;
