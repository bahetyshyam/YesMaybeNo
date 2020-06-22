import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

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
      <Text>{props.groupName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});

export default GroupCard;
