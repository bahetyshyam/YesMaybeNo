import React, {useRef} from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {HEADING, PLACEHOLDER} from '../styles/colors';
import ResponsesCircularProgress from '../components/ResponsesCircularProgress';
import Separator from '../components/Separator';

const ResponsesBottomSheet = ({reference, category, number, users, color}) => {
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
        <Separator />
      </View>
    );
  };

  return (
    <RBSheet
      ref={reference}
      closeOnDragDown={true}
      closeOnPressMask={true}
      animationType={'slide'}
      openDuration={300}
      closeDuration={300}
      customStyles={{
        // wrapper: {
        //   backgroundColor: 'rgba(52, 52, 52, 0.7)',
        // },
        draggableIcon: {
          backgroundColor: HEADING,
        },
        container: {
          borderRadius: 10,
          height: '70%',
        },
      }}>
      <View style={styles.mainContainer}>
        <View style={styles.progressBar}>
          <ResponsesCircularProgress number={number} color={color} />
          <Text style={styles.progressText}>{category}</Text>
        </View>
        <FlatList
          data={users}
          renderItem={({item}) => (
            <UserSearchView name={item[1]} email={item[2]} />
          )}
          keyExtractor={item => item[0]}
        />
      </View>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: '10%',
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '10%',
  },
  progressText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: '5%',
  },
  userSearchCard: {
    marginTop: '10%',
    marginBottom: '5%',
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
  },
  userEmail: {
    fontSize: 13,
    color: PLACEHOLDER,
  },
});

export default ResponsesBottomSheet;
