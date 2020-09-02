import React, {useEffect, useState, useRef, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  RefreshControl,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  SwitchComponent,
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
import LoadingScreen from '../components/LoadingScreen';
import {RadioButton} from 'react-native-paper';
import FormButtonSmall from '../components/FormButtonSmall';
import ResponsesBottomSheet from '../components/ResponsesBottomSheet';
import MoreInformationSheet from '../components/MoreInformationSheet';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import MIcon from 'react-native-vector-icons/dist/MaterialIcons';
import Modal from 'react-native-modal';
import AutoScrolling from 'react-native-auto-scrolling';
import {deleteEvent} from '../api/index';
import {getUser} from '../utils/asynStorage';
import CanelButtonSmall from '../components/CancelButtonSmall';
import {UserContext} from '../navigation/AppNavigator';

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

const Event = ({route, navigation}) => {
  const [event, setEvent] = useState([]);
  const [eventId, setEventId] = useState('');
  const [numberYes, setNumberYes] = useState(0);
  const [numberNo, setNumberNo] = useState(0);
  const [numberMaybe, setNumberMaybe] = useState(0);
  const [groupName, setGroupName] = useState('');
  const [numberOfParticipants, setNumberOfParticipants] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [eventInfoModalVisible, setEventInfoModalVisible] = useState(false);
  const [deleteEventModalVisible, setDeleteEventModalVisible] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [responseExists, setResponseExists] = useState(false);
  const {setUser, user} = useContext(UserContext);

  useEffect(() => {
    setIsLoading(value => !value);
    getEvent();
    // getLoggedInId();
  }, []);

  const refRBSheetYes = useRef();
  const refRBSheetMaybe = useRef();
  const refRBSheetNo = useRef();
  const refRBSheetMoreInfo = useRef();
  const scrollRef = useRef();

  let rYes = [],
    rNo = [],
    rMaybe = [];

  const getEvent = async () => {
    const {
      hostedById,
      groupName,
      numberOfParticipants,
      eventId,
      groupId,
    } = route.params;
    const response = await oneEvent(eventId);
    const eventArray = Object.values(response.data.event);
    setEvent(eventArray);
    console.log(eventArray[0].responses);
    userResponseExists(eventArray[0].responses);
    setGroupName(groupName);
    setNumberOfParticipants(numberOfParticipants);
    setEventId(eventId);
    const userLoggedIn = await getUser();
    if (userLoggedIn._id === hostedById) {
      setUserLoggedIn(true);
    }
    setIsLoading(value => !value);
  };

  // const getLoggedInId = async () => {
  //   const host = event[0].createdBy[0]._id;
  //   const userLoggedIn = await getUser();
  //   if (userLoggedIn._id === host) {
  //     setUserLoggedIn(true);
  //   }
  // };

  const handleDeleteEvent = async () => {
    try {
      const response = await deleteEvent(eventId);
      setEventInfoModalVisible(value => !value);
      // navigation.navigate('Events');
      navigation.goBack('Events');
    } catch (error) {
      console.log(error);
    }
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
      const response = await updateResponse(
        route.params.groupId,
        route.params.eventId,
        checked,
      );
      getEvent();
    } catch (err) {
      console.log(err);
    }
  };

  const toggleEventInfoModal = () => {
    setEventInfoModalVisible(!eventInfoModalVisible);
  };

  const getUserResponse = responses => {
    let userResponse;
    if (responses.length === 0) return null;
    else {
      for (response of responses)
        if (response.user[0]._id === user._id) {
          userResponse = response.response;
          break;
        }

      if (userResponse === 'yes') {
        setResponseExists(true);
        return <Yes />;
      } else if (userResponse === 'maybe') {
        setResponseExists(true);
        return <Maybe />;
      } else if (userResponse === 'no') {
        setResponseExists(true);
        return <No />;
      } else return null;
    }
  };

  const SwitchComponent = () => {
    userResponseExists(false);
  };

  const userResponseExists = responses => {
    let userResponse;
    if (responses[0].user.length === 0 || responses.length === 0)
      setResponseExists(false);
    else {
      for (response of responses)
        if (response.user[0]._id === user._id) {
          console.log('Found');
          userResponse = response.response;
          break;
        }

      if (userResponse === 'yes') {
        setResponseExists(true);
      } else if (userResponse === 'maybe') {
        setResponseExists(true);
      } else if (userResponse === 'no') {
        setResponseExists(true);
      } else setResponseExists(false);
    }
  };

  const UserHasResponded = ({responses}) => {
    return (
      <View>
        <View style={styles.responseComponent}>
          <Text style={styles.responseHeading}>Your Response</Text>
          <View style={styles.bubble}>{getUserResponse(responses)}</View>
        </View>
        <FormButtonSmall
          onPress={() => setResponseExists(false)}
          buttonTitle={'Change Response'}
        />
      </View>
    );
  };

  const UserHasNotResponded = () => {
    return (
      <View>
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
      </View>
    );
  };

  const DetailedEvent = ({eventName, schedule, hostedBy, responses}) => {
    const [day, date] = convertDate(schedule);

    return (
      <View style={styles.eventCard}>
        <View style={styles.firstMenu}>
          <Text style={styles.eventHeading}>{eventName}</Text>

          <TouchableOpacity onPress={() => toggleEventInfoModal()}>
            <Icon
              name="ellipsis-h"
              size={30}
              color={PLACEHOLDER}
              style={styles.hamburger}
            />
          </TouchableOpacity>
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
        {responseExists ? (
          <UserHasResponded responses={responses} />
        ) : (
          <UserHasNotResponded />
        )}

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
        <Modal
          isVisible={eventInfoModalVisible}
          animationInTiming={300}
          animationOutTiming={4000}>
          <View>
            <View style={styles.addMemberModal}>
              <View style={styles.firstMenu}>
                <Text style={styles.eventHeading}>{eventName}</Text>

                <TouchableWithoutFeedback
                  onPress={() => toggleEventInfoModal()}>
                  <MIcon
                    name="keyboard-arrow-down"
                    size={30}
                    color={PLACEHOLDER}
                    style={styles.hamburger}
                  />
                </TouchableWithoutFeedback>
              </View>
              <Text style={styles.eventGroup}>Hosted by {hostedBy}</Text>
              <Text style={styles.eventGroup}>Hosted on {groupName}</Text>
              <Text style={styles.eventGroup}>
                Number of participants are {numberOfParticipants}
              </Text>
              {userLoggedIn ? (
                <FormButtonSmall
                  onPress={() => {
                    handleDeleteEvent();
                  }}
                  buttonTitle={'Delete'}
                />
              ) : null}
            </View>
          </View>
        </Modal>
        <Modal
          isVisible={deleteEventModalVisible}
          animationInTiming={300}
          animationOutTiming={300}>
          <View>
            <View style={styles.addMemberModal}>
              <Text style={styles.question}>
                Do you wish to delete the event?
              </Text>
              <FormButtonSmall
                onPress={() => handleDeleteEvent()}
                buttonTitle={'Yes'}
              />
              <CanelButtonSmall
                onPress={() => toggleModal()}
                buttonTitle={'Cancel'}
              />
            </View>
          </View>
        </Modal>
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
                responses={item.responses}
                // hostedById={item.createdBy[0]._id}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: '10%',
    maxWidth: '90%',
  },
  horizontalComponent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventLocation: {
    color: PRIMARY,
    fontSize: 16,
  },
  eventGroup: {
    fontSize: 14,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: HEADING,
    marginVertical: '5%',
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
  scrolling: {
    paddingRight: 30,
  },
  addMemberModal: {
    padding: '5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },
  // icon: {
  //   alignSelf: 'flex-end',
  // },
  question: {
    fontSize: 20,
    paddingHorizontal: '2%',
    paddingVertical: '5%',
    fontWeight: 'bold',
  },
});

export default Event;
