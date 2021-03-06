import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import {PLACEHOLDER, PRIMARY, HEADING} from '../styles/colors';
import FirstIntro from '../assets/images/Artboard – 1.svg';

const FirstIntroSheet = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {/* <FIrstIntroImage style={styles.introImage} /> */}
        <Image
          source={require('../assets/images/user_group.png')}
          style={styles.introImage}
        />
        {/* <FirstIntro style={styles.nav} /> */}
        <Image
          source={require('../assets/images/1.png')}
          style={styles.slider}
        />
      </View>

      <View style={styles.textArea}>
        <Text style={styles.heading}>Create Groups</Text>
        <Text style={styles.information}>
          Invite your friends, family or even your boss to join your group
        </Text>
      </View>

      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('SecondIntroSheet')}>
        <View style={styles.buttonBackground}>
          <Icon
            name="arrow-right"
            size={30}
            style={styles.icon}
            color={'#FFFFFF'}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingVertical: '10%',
    // paddingHorizontal: '3%',
  },
  imageContainer: {
    paddingTop: '15%',
    paddingBottom: '5%',
    paddingHorizontal: '10%',
    backgroundColor: '#FFDCDC',
    alignItems: 'center',
  },
  introImage: {
    width: 400,
    height: 300,
    borderRadius: 10,
  },
  textArea: {
    paddingVertical: '15%',
    paddingHorizontal: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    // textAlign: 'center',
  },
  information: {
    color: HEADING,
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: '5%',
    lineHeight: 22,
  },
  icon: {
    alignSelf: 'center',
    marginTop: '20%',
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
  nav: {
    width: 60,
    height: '10%',
  },
  slider: {
    width: 50,
    height: 20,
    marginTop: '10%',
  },
});

export default FirstIntroSheet;
