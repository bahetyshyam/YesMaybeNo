import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {PLACEHOLDER} from '../styles/colors';
import FormInput from '../components/FormInput';
import Header from '../components/Header';
import Separator from '../components/Separator';
import FormButtonSmall from '../components/FormButtonSmall';
import LoadingScreen from '../components/LoadingScreen';
import LocationLogo from '../assets/images/Location.svg';
import {createEvent} from '../api/index';

const CreateEvent = ({route, navigation}) => {
  const [eventName, setEventName] = useState('');
  const [locationName, setLocationName] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [dateTextShow, setDateTextShow] = useState('Pick a date');
  const [timeTextShow, setTimeTextShow] = useState('Pick a time');
  const [dateValue, setDateValue] = useState(null);
  const [timeValue, setTimeValue] = useState(null);
  const [description, setDescription] = useState('Test Description');
  const [latitude, setLatidude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleDateTextShow = eventDate => {
    if (eventDate.length > 0) setDateTextShow(eventDate);
    else setDateTextShow('Pick a date');
  };

  const handleTimeTextShow = eventTime => {
    if (eventTime.length > 0) setTimeTextShow(eventTime);
    else setTimeTextShow('Pick a time');
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    const eventSchedule = '';
    setShow(Platform.OS === 'ios');
    if (mode == 'date') {
      const eventDate = currentDate.toDateString().substring(4);
      handleDateTextShow(eventDate);
      setDateValue(currentDate);
    } else {
      const eventTime = currentDate.toLocaleTimeString().substring(0, 5);
      handleTimeTextShow(eventTime);
      setTimeValue(currentDate);
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

  const handleSubmit = async () => {
    const dateObject = new Date(dateValue);
    const timeObject = new Date(timeValue);
    const finalDate = new Date(
      dateObject.getFullYear(),
      dateObject.getMonth(),
      dateObject.getDate(),
      timeObject.getHours(),
      timeObject.getMinutes(),
    ).toISOString();

    try {
      setIsLoading(value => !value);
      const response = await createEvent(
        eventName,
        finalDate,
        latitude,
        longitude,
        locationName,
        description,
        route.params.groupId,
      );
      console.log(response.data);
      setIsLoading(value => !value);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView style={styles.screenContainer}>
      <Header navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.heading}>Create an Event</Text>
        {isLoading ? (
          <LoadingScreen visible={isLoading} />
        ) : (
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
                value={locationName}
                onChangeText={name => setLocationName(name)}
                placeholder={'Rush Arena, Jayanagar'}
              />
              <LocationLogo style={styles.location} />
            </View>
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity style={styles.component} onPress={showDatepicker}>
              {dateTextShow === 'Pick a date' ? (
                <Text style={styles.placeholderComponent}>{dateTextShow}</Text>
              ) : (
                <Text style={styles.textComponent}>{dateTextShow}</Text>
              )}
              <Separator />
            </TouchableOpacity>
            <Text style={styles.label}>Time</Text>
            <TouchableOpacity style={styles.component} onPress={showTimepicker}>
              {timeTextShow === 'Pick a time' ? (
                <Text style={styles.placeholderComponent}>{timeTextShow}</Text>
              ) : (
                <Text style={styles.textComponent}>{timeTextShow}</Text>
              )}
              <Separator />
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
              onPress={() => {
                handleSubmit();
              }}
              buttonTitle={'Create'}
            />
          </View>
        )}
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
    marginBottom: 22,
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
    fontSize: 19,
  },
  horizontalComponent: {
    flexDirection: 'row',
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
