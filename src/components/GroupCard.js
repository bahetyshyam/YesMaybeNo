import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
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
      <Image
        source={require('../assets/images/group.jpg')}
        style={styles.userPicture}
      />
      <Text style={styles.groupNameText}>{props.groupName}</Text>
      <Separator />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  groupCard: {
    paddingHorizontal: '10%',
    paddingVertical: '1%',
    marginBottom: '6%',
    // justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupNameText: {
    fontSize: 19,
    color: HEADING,
    paddingHorizontal: '5%',
  },
  userPicture: {
    width: 70,
    height: 70,
    borderRadius: 70,
  },
});

export default GroupCard;
