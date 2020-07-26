import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import {group} from '../api/index';
import Header from '../components/Header';
import GroupCard from '../components/GroupCard';
import LoadingScreen from '../components/LoadingScreen';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {PRIMARY} from '../styles/colors';
// import {
//   TouchableWithoutFeedback,
//   TouchableOpacity,
// } from 'react-native-gesture-handler';
import AddButton from '../assets/images/add.svg';

const Groups = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    setIsLoading(value => !value);
    getGroups();
  }, []);

  const getGroups = async () => {
    try {
      const response = await group();
      setGroups(response.data.groups);
      setIsLoading(value => !value);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.screenContainer}>
        <Header navigation={navigation} />
        <SafeAreaView style={styles.container}>
          <Text style={styles.heading}>Groups</Text>
          {isLoading ? (
            <LoadingScreen visible={isLoading} />
          ) : (
            <FlatList
              data={groups}
              renderItem={({item}) => (
                <GroupCard
                  groupName={item.name}
                  groupId={item._id}
                  navigation={navigation}
                />
              )}
              keyExtractor={item => item._id}
              showsVerticalScrollIndicator={false}
            />
          )}
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('CreateGroup')}>
            <View style={styles.buttonBackground}>
              <Icon
                name="group-add"
                size={40}
                style={styles.icon}
                color={'#FFFFFF'}
              />
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </View>
    </>
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
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: '13%',
    paddingLeft: '9%',
  },
  icon: {
    alignSelf: 'center',
    marginVertical: '18%',
  },
  buttonBackground: {
    backgroundColor: PRIMARY,
    borderRadius: 70,
    bottom: '5%',
    right: '7%',
    position: 'absolute',
    height: 70,
    width: 70,
  },
});

export default Groups;
