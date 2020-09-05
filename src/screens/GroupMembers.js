import React, {useEffect, useState, useCallback} from 'react';
import LoadingScreen from '../components/LoadingScreen';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  RefreshControl,
  Image,
} from 'react-native';
import {groupMembers} from '../api/index';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import {PLACEHOLDER, PRIMARY} from '../styles/colors';

const GroupMembers = ({route, navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {groupName, groupId} = route.params;
  const [members, setMembers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setIsLoading(value => !value);
    getMembers();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getMembers();
    setIsLoading(value => !value);
    setRefreshing(false);
  }, []);

  const getMembers = async () => {
    const response = await groupMembers(groupId);
    const members = Object.values(response.data.members);

    setMembers(members);
    setIsLoading(value => !value);
  };

  const UserSearchView = ({name, email}) => {
    return (
      <View style={styles.userSearchCard}>
        <Image
          source={require('../assets/images/user.jpg')}
          style={styles.userPicture}
        />
        <View style={styles.infoCard}>
          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.screenContainer}>
      <Header navigation={navigation} />
      <SafeAreaView style={styles.container}>
        <View style={styles.firstMenu}>
          <View style={styles.groupHeadingComponent}>
            <Image
              source={require('../assets/images/group.jpg')}
              style={styles.groupPicture}
            />
            <Text style={styles.heading}>{groupName}</Text>
          </View>
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate('GroupMembers', {
                groupName: groupName,
                groupId: groupId,
              })
            }>
            <Icon
              name="ellipsis-h"
              size={30}
              color={PLACEHOLDER}
              style={styles.hamburger}
            />
          </TouchableWithoutFeedback>
        </View>
        <Text style={styles.memberHeading}>Members</Text>
        {isLoading ? (
          <LoadingScreen visible={isLoading} />
        ) : (
          // <View style={styles.memberContainer}>

          <FlatList
            data={members}
            renderItem={({item}) => (
              <UserSearchView name={item.name} email={item.email} />
            )}
            keyExtractor={item => item._id}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={PRIMARY}
              />
            }
          />
          // </View>
        )}
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate('AddMember', {
              groupId,
              groupName,
              members,
            })
          }>
          <View style={styles.buttonBackground}>
            <Icon
              name="user-plus"
              size={25}
              style={styles.icon}
              color={'#FFFFFF'}
            />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: '7%',
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: '3%',
  },
  userSearchCard: {
    marginTop: '5%',
    flexDirection: 'row',
  },
  groupPicture: {
    width: 80,
    height: 80,
    borderRadius: 70,
  },
  groupHeadingComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: '7%',
  },
  firstMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hamburger: {
    marginTop: '8%',
  },
  memberHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: '6%',
  },
  userPicture: {
    width: 60,
    height: 60,
    borderRadius: 70,
  },
  infoCard: {
    flexDirection: 'column',
    marginLeft: '5%',
    marginTop: '2%',
  },
  userName: {
    fontSize: 17,
  },
  userEmail: {
    fontSize: 13,
    color: PLACEHOLDER,
  },
  icon: {
    alignSelf: 'center',
    marginVertical: '22%',
  },
  buttonBackground: {
    backgroundColor: PRIMARY,
    borderRadius: 70,
    bottom: '5%',
    right: '7%',
    position: 'absolute',
    height: 60,
    width: 60,
    elevation: 5,
  },
});

export default GroupMembers;
