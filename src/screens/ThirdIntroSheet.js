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
import FIrstIntroImage from '../assets/images/FirstIntroImage.svg';

const ThirdIntroSheet = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/birthday_.png')}
          style={styles.introImage}
        />
        <Image
          source={require('../assets/images/3.png')}
          style={styles.slider}
        />
      </View>

      <View style={styles.textArea}>
        <Text style={styles.heading}>And have fun!</Text>
        <Text style={styles.information}>
          Don't bail out at the last moment though ;)
        </Text>
      </View>

      <TouchableWithoutFeedback onPress={() => navigation.navigate('Settings')}>
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
  slider: {
    width: 50,
    height: 20,
    marginTop: '10%',
  },
});

export default ThirdIntroSheet;
