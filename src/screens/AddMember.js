import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {PRIMARY, HEADING, PLACEHOLDER} from '../styles/colors';
import FormInput from '../components/FormInput';
import Header from '../components/Header';
import Separator from '../components/Separator';
import FormButtonSmall from '../components/FormButtonSmall';
import CanelButtonSmall from '../components/CancelButtonSmall';
import {searchUsers} from '../api/index';
import {addMember} from '../api/index';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import Modal from 'react-native-modal';

const AddMember = ({route, navigation}) => {
  const [addMemberModalVisible, setAddMemberModalVisible] = useState(false);
  const [searchField, setSearchField] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const {groupId, groupName, members} = route.params;
  const [userToAdd, setUserToAdd] = useState([]);

  const searchUsersFilter = async searchField => {
    // <PeopleSearchImage style={styles.peopleSearchImage} />;
    const membersNotInGroup = [];
    setSearchField(searchField);
    try {
      const response = await searchUsers(searchField);
      const userArray = Object.values(response.data.users);

      for (let userFromSearch of userArray)
        if (
          !members.some(userInGroup => userInGroup._id === userFromSearch._id)
        )
          membersNotInGroup.push(userFromSearch);

      setSearchResults(membersNotInGroup);
    } catch (err) {
      setSearchResults([]);
      //   <PeopleSearchImage style={styles.peopleSearchImage} />;
    }
  };

  const displayModel = (userId, userName) => {
    setAddMemberModalVisible(true);
    setUserToAdd([userId, userName]);
  };

  const UserSearchView = ({name, email, userId}) => {
    return (
      <TouchableOpacity onPress={() => displayModel(userId, name)}>
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
        <Separator />
      </TouchableOpacity>
    );
  };

  const handleAddMember = async () => {
    console.log(groupId);
    console.log(userToAdd[0]);
    const response = await addMember(groupId, userToAdd[0]);
    setAddMemberModalVisible(value => !value);
    ToastAndroid.show('Member Added', ToastAndroid.SHORT);
    navigation.navigate('GroupMembers', {
      groupName: groupName,
      groupId: groupId,
    });
  };

  const toggleModal = () => {
    setAddMemberModalVisible(!addMemberModalVisible);
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
        </View>

        <View style={styles.memberContainer}>
          <Text style={styles.memberHeading}>Add a member</Text>
        </View>
        <View style={styles.searchBox}>
          <FormInput
            value={searchField}
            onChangeText={name => searchUsersFilter(name)}
            placeholder={'Search for a person..'}
            style={styles.searchPlaceholder}
            underlineColorAndroid="transparent"
          />
          <View style={styles.searchIconBackground}>
            <Icon
              name="search"
              size={22}
              color={'#FFFFFF'}
              style={styles.searchIcon}
            />
          </View>
        </View>
        {searchResults.length === 0 ? (
          <View style={styles.noResult}>
            <Image
              source={require('../assets/images/search-result.png')}
              style={styles.noResultImage}
            />
            <Text style={styles.noResultText}>
              It's all empty in here
            </Text>
          </View>
        ) : (
          <FlatList
            data={searchResults}
            renderItem={({item}) => (
              <UserSearchView
                name={item.name}
                email={item.email}
                userId={item._id}
              />
            )}
            keyExtractor={item => item._id}
            scrollEnabled={false}
          />
        )}
        <Modal
          isVisible={addMemberModalVisible}
          animationInTiming={300}
          animationOutTiming={300}
          onBackdropPress={() => setAddMemberModalVisible(false)}>
          <View>
            <View style={styles.addMemberModal}>
              <Text style={styles.question}>
                You sure you wanna add {userToAdd[1]} to {groupName}?
              </Text>
              <FormButtonSmall
                onPress={() => handleAddMember()}
                buttonTitle={'Add'}
              />
              {/* <CanelButtonSmall
                onPress={() => toggleModal()}
                buttonTitle={'Cancel'}
              /> */}
            </View>
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
    backgroundColor: '#FFFFFF',
    padding: '7%',
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: '3%',
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
  memberHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: '5%',
  },
  searchBox: {
    flexDirection: 'row',
    height: 55,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    marginVertical: '5%',
    borderRadius: 5,
    elevation: 5,
    justifyContent: 'space-around',
  },
  searchIcon: {
    marginVertical: '18%',
    alignSelf: 'center',
  },
  searchPlaceholder: {
    color: HEADING,
    fontSize: 17,
    paddingLeft: '10%',
  },
  searchIconBackground: {
    backgroundColor: PRIMARY,
    width: '22%',
    height: '100%',
    alignSelf: 'flex-end',
    borderRadius: 5,
    marginLeft: '30%',
    elevation: 5,
  },
  userSearchCard: {
    marginTop: '3%',
    marginBottom: '-25%',
    height: 150,
    flexDirection: 'row',
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
    color: HEADING,
  },
  userEmail: {
    fontSize: 13,
    color: PLACEHOLDER,
  },
  addMemberModal: {
    padding: '5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },
  // icon: {
  //   alignSelf: 'flex-end',
  // },
  question: {
    fontSize: 16,
    paddingHorizontal: '2%',
    paddingVertical: '5%',
    // fontWeight: 'bold',
  },
  noResult: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  noResultImage: {
    width: 400,
    height: 250,
  },
  noResultText: {
    marginTop: '5%',
    fontSize: 14
  }
});

export default AddMember;
