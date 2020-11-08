import React, {useRef} from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {HEADING, PLACEHOLDER} from '../styles/colors';
import ResponsesCircularProgress from '../components/ResponsesCircularProgress';
import Separator from '../components/Separator';

const ResponsesBottomSheet = ({reference, category, number, users, color}) => {
  const UserSearchView = ({name, email}) => {
    return (
      <>
      <View style={styles.userSearchCard}>
        <Image
          source={require('../assets/images/user-3.jpg')}
          style={styles.userPicture}
        />
        <View style={styles.infoCard}>
          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </View>
      </View>
      {/* <Separator /> */}
      </>
    );
  };

  return (
    <RBSheet
      ref={reference}
      closeOnDragDown={true}
      closeOnPressMask={true}
      animationType={'slide'}
      openDuration={0}
      closeDuration={0}
      customStyles={{
        draggableIcon: {
          backgroundColor: HEADING,
        },
        container: {
          borderRadius: 10,
          height: '70%',
        },
      }}>
      {users.length === 0 ? (
        <View style={styles.noResult}>
          <Image
            source={require('../assets/images/not-found.png')}
            style={styles.noResultImage}
          />
          <Text style={styles.noResultText}>
            Looks like nobody has responded {category} yet
          </Text>
        </View>
      ) : (
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
            // nestedScrollEnabled={true}
            // contentContainerStyle={{
            //   flexGrow: 1,
            // }}
            // style={{flex: 1}}
          />
        </View>
      )}
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    // flex: 1,
    alignItems: 'center',
    paddingVertical: '10%',
    // paddingHorizontal: '20%'
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
    marginTop: '5%',
    marginBottom: '5%',
    flexDirection: 'row',
  },
  userPicture: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  infoCard: {
    flexDirection: 'column',
    marginLeft: '5%',
    marginTop: '2%',
  },
  userName: {
    fontSize: 17,
    // color: '#fff'
  },
  userEmail: {
    fontSize: 13,
    color: PLACEHOLDER,
  },
  noResult: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultImage: {
    width: 400,
    height: 250,
  },
  noResultText: {
    fontSize: 16,
    marginVertical: '10%',
  },
});

export default ResponsesBottomSheet;
