import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Separator from '../components/Separator';
import {HEADING} from '../styles/colors';

const GroupCard = props => {
  return (
    <TouchableOpacity
      style={styles.groupCard}
      onPress={() =>
        props.navigation.navigate('Group', {
          groupName: props.groupName,
          groupId: props.groupId,
        })
      }>
      <Text style={styles.groupNameText}>{props.groupName}</Text>
      <Separator />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  groupCard: {
    paddingHorizontal: '10%',
    paddingVertical: '2%',
    marginBottom: '6%',
    justifyContent: 'center',
  },
  groupNameText: {
    fontSize: 19,
    color: HEADING,
  },
});

export default GroupCard;
