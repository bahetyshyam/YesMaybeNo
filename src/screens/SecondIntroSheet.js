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
import FirstIntroImage from '../assets/images/FirstIntroImage.svg';

const SecondIntroSheet = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/SecondIntroImage.png')}
          style={styles.introImage}
        />
      </View>

      <View style={styles.textArea}>
        <Text style={styles.heading}>Organize Events</Text>
        <Text style={styles.information}>
          Set a date and time for the event you want to host and gather
          responses from group members
        </Text>
      </View>

      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('ThirdIntroSheet')}>
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
    paddingVertical: '15%',
    paddingHorizontal: '10%',
    backgroundColor: '#FFDCDC',
    alignItems: 'center',
  },
  introImage: {
    width: 320,
    height: 350,
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
});

export default SecondIntroSheet;
