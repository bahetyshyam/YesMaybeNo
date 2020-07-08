import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import {PRIMARY, HEADING, PLACEHOLDER} from '../styles/colors';
import FormInput from '../components/FormInput';
import Header from '../components/Header';
import Separator from '../components/Separator';
import FormButtonSmall from '../components/FormButtonSmall';
import LoadingScreen from '../components/LoadingScreen';
import SearchIcon from '../assets/images/search.svg';
import PeopleSearchImage from '../assets/images/peopleSearch.svg';
import {searchUsers} from '../api/index';
import {addGroup} from '../api/index';
import {getUser} from '../utils/asynStorage';
import {FlatList} from 'react-native-gesture-handler';
import CheckBox from 'react-native-check-box';

const CreateGroup = ({navigation}) => {
  const [groupName, setGroupName] = useState('');
  const [searchField, setSearchField] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [usersSearchArray, setUsersSearchArray] = useState({});
  const [user, setUser] = useState(false);
  const [error, setError] = useState('');

  const searchUsersFilter = async searchField => {
    <PeopleSearchImage style={styles.peopleSearchImage} />;
    setSearchField(searchField);
    try {
      const response = await searchUsers(searchField);
      const userArray = Object.values(response.data.users);
      setSearchResults(userArray);
    } catch (err) {
      setSearchResults([]);
      <PeopleSearchImage style={styles.peopleSearchImage} />;
    }
  };

  const handleOnClickCheckBox = userId => {
    if (usersSearchArray['' + userId + ''] == undefined) {
      setUsersSearchArray({...usersSearchArray, [userId]: true});
    } else {
      setUsersSearchArray({
        ...usersSearchArray,
        [userId]: !usersSearchArray['' + userId + ''],
      });
    }

    //To check checked users in real time.
    setUsersSearchArray(state => {
      return state;
    });
  };

  const handleCheckedUsers = async () => {
    const admin = await getUser();
    if (admin) setUser(admin);
    else setUser(false);

    let users = [];
    console.log(usersSearchArray);
    for (const [user, isChecked] of Object.entries(usersSearchArray))
      if (isChecked === true) users.push(user);

    users.push(admin._id);

    if (!groupName || users.length == 0) {
      setError('Please enter your group name / Choose members');
      console.log(error);
      return;
    }
    try {
      const response = await addGroup(groupName, users);
      console.log('Group added');
    } catch (err) {
      setError(err.response.data.message);
      console.log(error);
    }
  };

  const UserSearchView = ({name, email, userId}) => {
    return (
      <View style={styles.userSearchCard}>
        <Image source={require("../assets/images/user.jpg")} style={styles.userPicture} />
        <View style={styles.infoCard}>
          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </View>
        <CheckBox
          style={styles.checkbox}
          onClick={() => {
            handleOnClickCheckBox(userId);
          }}
          isChecked={
            usersSearchArray['' + userId + '']
              ? usersSearchArray['' + userId + '']
              : false
          }
          checkedCheckBoxColor={PRIMARY}
          uncheckedCheckBoxColor={PLACEHOLDER}
        />
        <Separator />
      </View>
    );
  };

  return (
    <View style={styles.screenContainer}>
      <Header navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.heading}>Create a group</Text>
        <Text style={styles.label}>Group name</Text>
        <FormInput
          value={groupName}
          onChangeText={name => setGroupName(name)}
          placeholder={'Dunder Mifflin'}
        />
        <Text style={styles.addMembersText}>Add members</Text>
        <View style={styles.searchBox}>
          <FormInput
            value={searchField}
            onChangeText={name => searchUsersFilter(name)}
            placeholder={'Search for a person..'}
            style={styles.searchPlaceholder}
            underlineColorAndroid="transparent"
          />
          <View style={styles.searchIconBackground}>
            <SearchIcon style={styles.searchIcon} />
          </View>
        </View>
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
        />
        <FormButtonSmall
          onPress={() => {
            handleCheckedUsers();
          }}
          buttonTitle={'Create'}
        />
      </View>
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
    paddingVertical: '10%',
    paddingHorizontal: '8%',
  },
  heading: {
    marginBottom: '12%',
    fontSize: 32,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 19,
  },
  addMembersText: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  searchBox: {
    flexDirection: 'row',
    height: 55,
    backgroundColor: '#ECECEC',
    alignItems: 'center',
    marginVertical: '5%',
    borderRadius: 5,
    elevation: 5,
    justifyContent: 'space-around',
  },
  searchIcon: {
    width: '40%',
    height: '40%',
    marginLeft: '30%',
    marginTop: '20%',
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
  checkbox: {
    flex: 1,
    alignItems: 'flex-end',
  },
  peopleSearchImage: {
    width: 300,
    height: 300,
  },
});

export default CreateGroup;
