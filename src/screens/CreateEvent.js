import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {PLACEHOLDER, HEADING} from '../styles/colors';
import FormInput from '../components/FormInput';
import Header from '../components/Header';
import Separator from '../components/Separator';
import FormButtonSmall from '../components/FormButtonSmall';
import LoadingScreen from '../components/LoadingScreen';
import LocationLogo from '../assets/images/Location.svg';
import {createEvent} from '../api/index';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';

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
                <View style={styles.horizontalComponent}>
                  <Text style={styles.placeholderComponent}>
                    {dateTextShow}
                  </Text>
                  <Icon
                    name="calendar-alt"
                    size={25}
                    color={HEADING}
                    style={styles.hamburger}
                  />
                </View>
              ) : (
                <Text style={styles.textComponent}>{dateTextShow}</Text>
              )}
              <Separator />
            </TouchableOpacity>
            <Text style={styles.label}>Time</Text>
            <TouchableOpacity style={styles.component} onPress={showTimepicker}>
              {timeTextShow === 'Pick a time' ? (
                <View style={styles.horizontalComponent}>
                  <Text style={styles.placeholderComponent}>
                    {timeTextShow}
                  </Text>
                  <Icon
                    name="clock"
                    size={25}
                    color={HEADING}
                    style={styles.hamburger}
                  />
                </View>
              ) : (
                <View style={styles.horizontalComponent}>
                  <Text style={styles.textComponent}>{timeTextShow}</Text>
                  <Icon
                    name="clock"
                    size={25}
                    color={HEADING}
                    style={styles.hamburger}
                  />
                </View>
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
    borderRadius: 7,
  },
  label: {
    fontSize: 19,
  },
  horizontalComponent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginLeft: '-12%',
    marginTop: '2%',
  },
  calender: {
    width: 45,
    height: 45,
    marginTop: '2%',
    alignSelf: 'flex-end',
  },
  iconStyle: {
    fontSize: 30,
    color: 'black',
  },
});

export default CreateEvent;
