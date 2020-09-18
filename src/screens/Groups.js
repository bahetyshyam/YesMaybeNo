import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  RefreshControl,
  FlatList,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {group} from '../api/index';
import Header from '../components/Header';
import GroupCard from '../components/GroupCard';
import LoadingScreen from '../components/LoadingScreen';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {PRIMARY, HEADING} from '../styles/colors';

const Groups = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [groups, setGroups] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // setIsLoading(value => !value);
    const unsubscribe = navigation.addListener('focus', () => {
      getGroups();
      setIsLoading(value => !value);
    });
    return unsubscribe;
  }, [navigation]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getGroups();
    setIsLoading(value => !value);
    setRefreshing(false);
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
        {groups.length === 0 ? (
          isLoading ? (
            <LoadingScreen visible={isLoading} />
          ) : (
            <SafeAreaView
              style={{flex: 1, backgroundColor: '#FFFFFF', padding: 20}}>
              <Text style={styles.heading}>Groups</Text>

              <View style={styles.noResult}>
                <Image
                  source={require('../assets/images/no-groups.png')}
                  style={styles.noResultImage}
                />
                <Text style={styles.noResultText}>
                  Looks like you are not in any groups.
                </Text>
              </View>
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
          )
        ) : (
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
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor={PRIMARY}
                  />
                }
              />
            )}
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('CreateGroup')}>
              <View style={styles.buttonBackground}>
                <Icon
                  name="group-add"
                  size={35}
                  style={styles.icon}
                  color={'#FFFFFF'}
                />
              </View>
            </TouchableWithoutFeedback>
          </SafeAreaView>
        )}
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
    backgroundColor: '#fff',
    padding: '7%',
  },
  heading: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: '5%',
    // paddingLeft: '9%',
  },
  noResult: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  noResultImage: {
    width: 325,
    height: 325,
  },
  noResultText: {
    fontSize: 16,
    marginVertical: '10%',
    color: HEADING,
    textAlign: 'center',
  },
  icon: {
    alignSelf: 'center',
    marginVertical: '20%',
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

export default Groups;
