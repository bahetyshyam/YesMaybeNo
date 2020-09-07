import React, {useEffect, useState, useCallback, useContext} from 'react';
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
  Button,
} from 'react-native';
import {groupMembers, updateAdmin, group} from '../api/index';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import {PLACEHOLDER, PRIMARY} from '../styles/colors';
import {UserContext} from '../navigation/AppNavigator';
import Modal from 'react-native-modal';
import FormButtonSmall from '../components/FormButtonSmall';

const GroupMembers = ({route, navigation}) => {
  const {user} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const {groupName, groupId} = route.params;
  const [members, setMembers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState({});

  useEffect(() => {
    // setIsLoading(value => !value);
    const unsubscribe = navigation.addListener('focus', () => {
      getMembersFirstCall();
      setIsLoading(value => !value);
    });
    return unsubscribe;
  }, [navigation]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getMembers();
    setIsLoading(value => !value);
    setRefreshing(false);
  }, []);

  const getMembersFirstCall = async () => {
    const response = await groupMembers(groupId);
    const members = Object.values(response.data.members);
    setAdmins(Object.values(response.data.admins));
    setMembers(members);
    setIsCurrentUserAdmin(response.data.admins.includes(user._id));
    setIsLoading(value => !value);
  };

  const getMembers = async () => {
    const response = await groupMembers(groupId);
    const members = Object.values(response.data.members);
    setAdmins(Object.values(response.data.admins));
    setMembers(members);
    setIsLoading(value => !value);
  };

  const handleLongPress = userId => {
    if (admins.includes(userId)) {
      setSelectedMember({
        userId: userId,
        modalText: 'Remove Admin',
        isAdmin: true,
      });
    } else {
      setSelectedMember({
        userId: userId,
        modalText: 'Make Admin',
        isAdmin: false,
      });
    }
    setIsModalVisible(true);
  };

  const handleMakeRemovePress = async () => {
    setIsModalVisible(false);
    let type;
    if (selectedMember.isAdmin) {
      type = 'remove';
    } else type = 'add';

    try {
      const response = await updateAdmin(groupId, type, selectedMember.userId);
      console.log(response.data);
    } catch (error) {
      console.log(error.data);
    }
    onRefresh();
  };

  const UserSearchView = ({name, email, userId}) => {
    if (admins.includes(userId)) console.log(userId);
    return (
      <TouchableOpacity
        onLongPress={
          isCurrentUserAdmin ? () => handleLongPress(userId) : undefined
        }
        style={styles.userSearchCard}>
        <Image
          source={require('../assets/images/user-3.jpg')}
          style={styles.userPicture}
        />
        {admins.includes(userId) ? (
          <Icon name="crown" size={25} style={styles.admin} color={PRIMARY} />
        ) : null}

        <View style={styles.infoCard}>
          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </View>
      </TouchableOpacity>
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
              <UserSearchView
                name={item._id === user._id ? 'You' : item.name}
                email={item.email}
                userId={item._id}
              />
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
          // {/* </View> */}
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
        <Modal
          isVisible={isModalVisible}
          animationInTiming={200}
          animationOutTiming={200}
          onBackdropPress={() => setIsModalVisible(false)}>
          <View style={styles.addMemberModal}>
            {/* <TouchableOpacity
              activeOpacity={0.8}
              style={styles.makeRemoveAdminModal}
              onPress={() => handleMakeRemovePress()}>
              <Text style={styles.modalText}>{selectedMember.modalText}</Text>
            </TouchableOpacity> */}
            <FormButtonSmall
              onPress={() => handleMakeRemovePress()}
              buttonTitle={'Make Admin'}
            />
          </View>
        </Modal>
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
  makeRemoveAdminModal: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    width: '70%',
    alignItems: 'center',
    borderRadius: 2,
  },
  modalText: {
    fontSize: 16,
  },
  addMemberModal: {
    paddingHorizontal: '5%',
    paddingBottom: '5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },
  admin: {
    // justifyContent: 'flex-end',
    marginLeft: '-5%',
    marginTop: '-2%',
  },
});

export default GroupMembers;
