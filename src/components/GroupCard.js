import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import Separator from '../components/Separator';
import {HEADING, SEPARATOR} from '../styles/colors';

const GroupCard = props => {
  return (
    <View>
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
      </TouchableOpacity>
      <Separator />
    </View>
  );
};

const styles = StyleSheet.create({
  groupCard: {
    // paddingHorizontal: '10%',
    paddingVertical: '1%',
    marginTop: '5%',
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
  underline: {
    borderBottomColor: SEPARATOR,
    borderBottomWidth: 10,
  },
});

export default GroupCard;
