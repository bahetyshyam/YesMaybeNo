import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {PRIMARY, HEADING, PLACEHOLDER, SEPARATOR} from '../styles/colors';
import FormInput from '../components/FormInput';
import Header from '../components/Header';
import FormButtonSmall from '../components/FormButtonSmall';
import LoadingScreen from '../components/LoadingScreen';
import LocationLogo from '../assets/images/Location.svg';
import {TextInput} from 'react-native-paper';

const CreateEvent = ({navigation}) => {
  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [dateText, setDateText] = useState('Pick a date');
  const [timeText, setTimeText] = useState('Pick a time');
  const [description, setDescription] = useState('');

  const handleDateText = eventDate => {
    if (eventDate.length > 0) setDateText(eventDate);
    else setDateText('Pick a date');
  };

  const handleTimeText = eventTime => {
    if (eventTime.length > 0) setTimeText(eventTime);
    else setTimeText('Pick a time');
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    const eventSchedule = '';
    console.log(currentDate);
    setShow(Platform.OS === 'ios');
    if (mode == 'date') {
      const eventDate = currentDate.toDateString().substring(4);
      handleDateText(eventDate);
    } else {
      const eventTime = currentDate.toLocaleTimeString().substring(0, 5);
      handleTimeText(eventTime);
    }
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <ScrollView style={styles.screenContainer}>
      <Header navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.heading}>Create an Event</Text>
        <View style={styles.box}>
          <Text style={styles.label}>Event name</Text>
          <FormInput
            value={eventName}
            onChangeText={name => setEventName(name)}
            placeholder={'Play football'}
          />
          <Text style={styles.label}>Location</Text>
          <View style={styles.horizontalComponent}>
            <FormInput
              value={location}
              onChangeText={name => setLocation(name)}
              placeholder={'Rush Arena, Jayanagar'}
            />
            <LocationLogo style={styles.location} />
          </View>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity style={styles.component} onPress={showDatepicker}>
            {dateText === 'Pick a date' ? (
              <Text style={styles.placeholderComponent}>{dateText}</Text>
            ) : (
              <Text style={styles.textComponent}>{dateText}</Text>
            )}
            <View style={styles.underline} />
          </TouchableOpacity>
          <Text style={styles.label}>Time</Text>
          <TouchableOpacity style={styles.component} onPress={showTimepicker}>
            {timeText === 'Pick a time' ? (
              <Text style={styles.placeholderComponent}>{timeText}</Text>
            ) : (
              <Text style={styles.textComponent}>{timeText}</Text>
            )}
            <View style={styles.underline} />
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          {/* <Text style={styles.label}>Description</Text>
          <TextInput
            multiline
            value={description}
            numberOfLines={4}
            onChangeText={text => setDescription(text)}
            placeholder="Provide a description for the event"
          /> */}
          <FormButtonSmall
            // onPress={() => {
            //   handleUpdateResponse();
            // }}
            buttonTitle={'Create'}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  heading: {
    marginLeft: 15,
    marginBottom: 15,
    fontSize: 32,
    fontWeight: 'bold',
    paddingHorizontal: '5%',
  },
  box: {
    paddingTop: '12%',
    paddingRight: '10%',
    paddingBottom: '7%',
    paddingLeft: '10%',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  label: {
    fontSize: 21,
  },
  horizontalComponent: {
    flexDirection: 'row',
  },
  underline: {
    borderBottomColor: SEPARATOR,
    borderBottomWidth: 1,
    marginVertical: '2%',
  },
  component: {
    marginTop: 5,
    marginBottom: 35,
  },
  textComponent: {
    fontSize: 16,
    marginTop: '4%',
  },
  placeholderComponent: {
    color: PLACEHOLDER,
    fontSize: 16,
    marginTop: '4%',
  },
  location: {
    width: 45,
    height: 45,
    marginLeft: '-15%',
    marginTop: '2%',
  },
});

export default CreateEvent;
