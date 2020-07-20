import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import {oneEvent, updateResponse} from '../api/index';
import Header from '../components/Header';
import LocationLogo from '../assets/images/Location.svg';
import {
  PRIMARY,
  HEADING,
  PLACEHOLDER,
  SECONDARY,
  SEPARATOR,
} from '../styles/colors';
import Yes from '../assets/images/Green bubble.svg';
import Maybe from '../assets/images/Grey bubble.svg';
import No from '../assets/images/Red bubble.svg';
// import More from '../assets/images/Camera-Dark.svg';
import LoadingScreen from '../components/LoadingScreen';
import {RadioButton} from 'react-native-paper';
import FormButtonSmall from '../components/FormButtonSmall';
import ResponsesBottomSheet from '../components/ResponsesBottomSheet';
import MoreInformationSheet from '../components/MoreInformationSheet';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const Event = ({route, navigation}) => {
  const [event, setEvent] = useState([]);
  const [numberYes, setNumberYes] = useState(0);
  const [numberNo, setNumberNo] = useState(0);
  const [numberMaybe, setNumberMaybe] = useState(0);
  const [groupName, setGroupName] = useState('');
  const [numberOfParticipants, setNumberOfParticipants] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState('');

  useEffect(() => {
    setIsLoading(value => !value);
    getEvent();
  }, []);

  const refRBSheetYes = useRef();
  const refRBSheetMaybe = useRef();
  const refRBSheetNo = useRef();
  const refRBSheetMoreInfo = useRef();

  let rYes = [],
    rNo = [],
    rMaybe = [];

  const getEvent = async () => {
    const {groupName, numberOfParticipants, eventId} = route.params;
    const response = await oneEvent(eventId);
    const eventArray = Object.values(response.data.event);
    setEvent(eventArray);
    setGroupName(groupName);
    setNumberOfParticipants(numberOfParticipants);
    setIsLoading(value => !value);
  };

  const convertDate = dbDate => {
    const date = new Date(dbDate);
    return [
      date.toDateString().substring(0, 3),
      date.toDateString().substring(4),
    ];
  };

  const getEventTime = dbDate => {
    const time = new Date(dbDate);
    getResponseCount();
    return time.toLocaleTimeString().substring(0, 5);
  };

  const getResponseCount = () => {
    let yes = 0,
      no = 0,
      maybe = 0;

    event[0].responses.map(response => {
      if (response.response === 'yes') {
        rYes.push([
          response.user[0]._id,
          response.user[0].name,
          response.user[0].email,
        ]);
        yes += 1;
      } else if (response.response === 'no') {
        rNo.push([
          response.user[0]._id,
          response.user[0].name,
          response.user[0].email,
        ]);
        no += 1;
      } else if (response.response === 'maybe') {
        rMaybe.push([
          response.user[0]._id,
          response.user[0].name,
          response.user[0].email,
        ]);
        maybe += 1;
      }
    });

    // setResponseYes(rYes);
    // setResponseMaybe(rMaybe);
    // setResponseNo(rNo);

    setNumberYes(yes);
    setNumberMaybe(maybe);
    setNumberNo(no);
  };

  const onYesResponses = () => {
    refRBSheetYes.current.open();
  };

  const onNoResponses = () => {
    refRBSheetNo.current.open();
  };

  const onMaybeResponses = () => {
    refRBSheetMaybe.current.open();
  };

  const moreInformation = () => {
    refRBSheetMoreInfo.current.open();
  };

  const handleUpdateResponse = async () => {
    setIsLoading(value => !value);
    try {
      const response = await updateResponse(route.params.eventId, checked);
      getEvent();
    } catch (err) {
      console.log(err);
    }
  };

  const DetailedEvent = ({eventName, schedule, hostedBy}) => {
    const [day, date] = convertDate(schedule);

    return (
      <View style={styles.eventCard}>
        <View style={styles.firstMenu}>
          <Text style={styles.eventHeading}>{eventName}</Text>
          <TouchableWithoutFeedback onPress={() => moreInformation()}>
            <Icon
              name="ellipsis-h"
              size={45}
              color={PLACEHOLDER}
              style={styles.hamburger}
            />
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.horizontalComponent}>
          <LocationLogo style={styles.location} />
          <Text style={styles.eventLocation}>No location</Text>
        </View>
        <View style={styles.eventSchedule}>
          <View style={styles.eventDateComponent}>
            <Text style={styles.eventDay}>{day}</Text>
            <Text style={styles.eventDate}>{date}</Text>
          </View>
          <View style={styles.eventTimeComponent}>
            <Text style={styles.eventTime}>{getEventTime(schedule)}</Text>
            <Text style={styles.eventDuration}>45 mins</Text>
          </View>
        </View>

        <View style={styles.responsesComponent}>
          <Text style={styles.responseHeading}>Responses</Text>
          <View style={styles.responseComponent}>
            <View style={styles.bubble}>
              <Yes />
            </View>
            {numberYes === 1 ? (
              <TouchableWithoutFeedback onPress={() => onYesResponses()}>
                <Text style={styles.eventResponse}>
                  {numberYes} has responded Yes
                </Text>
              </TouchableWithoutFeedback>
            ) : (
              <TouchableWithoutFeedback onPress={() => onYesResponses()}>
                <Text style={styles.eventResponse}>
                  {numberYes} have responded Yes
                </Text>
              </TouchableWithoutFeedback>
            )}
          </View>
          <View style={styles.responseComponent}>
            <View style={styles.bubble}>
              <Maybe />
            </View>
            {numberMaybe === 1 ? (
              <TouchableWithoutFeedback onPress={() => onMaybeResponses()}>
                <Text style={styles.eventResponse}>
                  {numberMaybe} has responded Maybe
                </Text>
              </TouchableWithoutFeedback>
            ) : (
              <TouchableWithoutFeedback onPress={() => onMaybeResponses()}>
                <Text style={styles.eventResponse}>
                  {numberMaybe} have responded Maybe
                </Text>
              </TouchableWithoutFeedback>
            )}
          </View>
          <View style={styles.responseComponent}>
            <View style={styles.bubble}>
              <No />
            </View>
            {numberNo === 1 ? (
              <TouchableWithoutFeedback onPress={() => onNoResponses()}>
                <Text style={styles.eventResponse}>
                  {numberNo} has responded No
                </Text>
              </TouchableWithoutFeedback>
            ) : (
              <TouchableWithoutFeedback onPress={() => onNoResponses()}>
                <Text style={styles.eventResponse}>
                  {numberNo} have responded No
                </Text>
              </TouchableWithoutFeedback>
            )}
          </View>
          {numberOfParticipants - (numberYes + numberMaybe + numberNo) === 1 ? (
            <Text style={styles.yetToRespond}>1 person is yet to respond</Text>
          ) : (
            <Text style={styles.yetToRespond}>
              {numberOfParticipants - (numberYes + numberMaybe + numberNo)}{' '}
              people are yet to respond
            </Text>
          )}
        </View>
        <Text style={styles.responseHeading}>Your Response</Text>
        <View style={styles.userResponseButtons}>
          <RadioButton
            value="yes"
            status={checked === 'yes' ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked('yes');
            }}
            color={PRIMARY}
          />
          <Text style={styles.userResponseLabel}>Yes</Text>
          <RadioButton
            value="maybe"
            status={checked === 'maybe' ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked('maybe');
            }}
            color={PRIMARY}
          />
          <Text style={styles.userResponseLabel}>Maybe</Text>
          <RadioButton
            value="no"
            status={checked === 'no' ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked('no');
            }}
            color={PRIMARY}
          />
          <Text style={styles.userResponseLabel}>No</Text>
        </View>
        <FormButtonSmall
          onPress={() => {
            handleUpdateResponse();
          }}
          buttonTitle={'Respond'}
        />
        <MoreInformationSheet
          reference={refRBSheetMoreInfo}
          eventName={eventName}
          hostedBy={hostedBy}
          groupName={groupName}
          numberOfParticipants={numberOfParticipants}
        />
        <ResponsesBottomSheet
          reference={refRBSheetYes}
          category={'Yes'}
          number={(numberYes / numberOfParticipants) * 100}
          users={rYes}
          color={SECONDARY}
        />
        <ResponsesBottomSheet
          reference={refRBSheetMaybe}
          category={'Maybe'}
          number={(numberMaybe / numberOfParticipants) * 100}
          users={rMaybe}
          color={PLACEHOLDER}
        />
        <ResponsesBottomSheet
          reference={refRBSheetNo}
          category={'No'}
          number={(numberNo / numberOfParticipants) * 100}
          users={rNo}
          color={PRIMARY}
        />
      </View>
    );
  };

  return (
    <View style={styles.screenContainer}>
      <Header navigation={navigation} />
      <SafeAreaView style={styles.container}>
        {isLoading ? (
          <LoadingScreen visible={isLoading} />
        ) : (
          <FlatList
            data={event}
            renderItem={({item}) => (
              <DetailedEvent
                eventName={item.name}
                schedule={item.schedule}
                hostedBy={item.createdBy[0].name}
              />
            )}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
          />
        )}
      </SafeAreaView>
    </View>
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
  details: {
    height: '100%',
  },
  bubble: {
    width: 45,
    height: 45,
    marginTop: 3,
  },
  eventCard: {
    paddingHorizontal: '10%',
    paddingVertical: '6%',
    backgroundColor: '#fff',
    borderRadius: 7,
    marginBottom: '6%',
  },
  eventHeading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: '5%',
  },
  horizontalComponent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventLocation: {
    color: PRIMARY,
    fontSize: 18,
  },
  eventGroup: {
    fontSize: 14,
    color: PLACEHOLDER,
    paddingBottom: 7,
  },
  responsesComponent: {
    flex: 1,
    marginVertical: '5%',
  },
  responseComponent: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: -12,
    marginBottom: -5,
  },
  responseHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: HEADING,
    marginVertical: '3%',
  },
  eventData: {
    marginLeft: 28,
  },
  eventResponse: {
    fontSize: 16,
  },
  yetToRespond: {
    textAlign: 'right',
    marginVertical: 10,
    color: PLACEHOLDER,
    fontSize: 13,
  },
  userResponseButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  userResponseLabel: {
    marginLeft: -25,
    fontSize: 15,
  },
  lottie: {
    width: 70,
    height: 70,
  },
  location: {
    width: 45,
    height: 45,
    marginLeft: -15,
  },
  moreInformation: {
    width: 40,
    height: 40,
  },
  eventSchedule: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '7%',
  },
  eventDateComponent: {
    padding: '5%',
    borderLeftColor: PRIMARY,
    borderLeftWidth: 10,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
  },
  eventTimeComponent: {
    padding: '5%',
    borderLeftColor: SECONDARY,
    borderLeftWidth: 10,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
  },
  eventDay: {
    fontWeight: 'bold',
    fontSize: 14,
    color: HEADING,
  },
  eventDate: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  eventTime: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  eventDuration: {
    fontWeight: 'bold',
    fontSize: 14,
    color: HEADING,
  },
  firstMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Event;
