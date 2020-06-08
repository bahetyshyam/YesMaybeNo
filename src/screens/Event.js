import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, SafeAreaView, FlatList, TouchableOpacity} from 'react-native';
import {oneEvent} from '../api/index';
import Header from '../components/Header';
import LocationLogo from '../assets/images/Location.svg';
import { PRIMARY, HEADING, PLACEHOLDER } from '../styles/colors';
import Yes from '../assets/images/Green bubble.svg';
import Maybe from '../assets/images/Grey bubble.svg';
import No from '../assets/images/Red bubble.svg';
import LoadingScreen from '../components/LoadingScreen';
import { RadioButton } from 'react-native-paper';
import FormButtonSmall from '../components/FormButtonSmall';

const Event = ({route, navigation}) => {
    const [event, setEvent] = useState([]);
    const [numberYes, setNumberYes] = useState(0);
    const [numberNo, setNumberNo] = useState(0);
    const [numberMaybe, setNumberMaybe] = useState(0);
    const [groupName, setGroupName] = useState("");
    const [numberOfParticipants, setNumberOfParticipants] = useState(0);
    const [checked, setChecked] = useState('');

    useEffect(() => {
        getEvent();
    }, []);

    const getEvent = async () => {
      const {groupName, numberOfParticipants, eventId} = route.params;
      const response = await oneEvent(eventId);
      const eventArray = Object.values(response.data.event);
      setEvent(eventArray);
      setGroupName(groupName);
      setNumberOfParticipants(numberOfParticipants);
    }

    const convertDate = (dbDate) => {
      const date = new Date(dbDate);
      return date.toDateString().substring(4);
    }
    
    const getEventTime = (dbDate) => {
      const time = new Date(dbDate);
      getResponseCount();
      return time.toLocaleTimeString().substring(0, 5);
    }

    const getResponseCount = () => {
      let yes = 0, no = 0, maybe = 0;
      event[0].responses.map(response => {
          if (response.response === "yes")
              yes += 1;
          else if (response.response === "no")
              no += 1;
          else if (response.response === "maybe")
              maybe += 1;
        })

        setNumberYes(yes);
        setNumberMaybe(maybe);
        setNumberNo(no);
    }

    const DetailedEvent = ({eventName, schedule, hostedBy}) => {
      return (
        <View style={styles.eventCard}>
            <Text style={styles.eventHeading}>{eventName}</Text>
            <View style={styles.horizontalComponent}>
                <LocationLogo style={styles.location} />
                <Text style={styles.eventLocation}>No location</Text>
            </View>
            <View style={styles.eventData}>
              <View style={styles.verticalComponent}>
                <Text style={styles.eventSchedule}>{convertDate(schedule)}</Text>
                <Text style={styles.eventSchedule}>{getEventTime(schedule)}</Text>
              </View>
              <View>
                <Text style={styles.eventGroup}>Hosted by {hostedBy}</Text>
                <Text style={styles.eventGroup}>Hosted on {groupName}</Text>
                <Text style={styles.eventGroup}>Number of participants are {numberOfParticipants}</Text>
              </View>
            </View>
            <View style={styles.responsesComponent}>
              <Text style={styles.responseHeading}>Responses</Text>
              <View style={styles.responseComponent}>
                <View style={styles.bubble}><Yes /></View>
                {numberYes === 1 ? <Text style={styles.eventResponse}>{numberYes} has responded Yes</Text> :
                  <Text style={styles.eventResponse}>{numberYes} have responded Yes</Text>}
              </View>
              <View style={styles.responseComponent}>
                <View style={styles.bubble}><Maybe /></View>
                {numberMaybe === 1 ? <Text style={styles.eventResponse}>{numberMaybe} has responded Maybe</Text> :
                <Text style={styles.eventResponse}>{numberMaybe} have responded Maybe</Text>}
              </View>
              <View style={styles.responseComponent}>
                <View style={styles.bubble}><No /></View>
                  {numberNo=== 1 ? <Text style={styles.eventResponse}>{numberNo} has responded No</Text> :
                  <Text style={styles.eventResponse}>{numberNo} have responded No</Text>}
              </View>
              {numberOfParticipants - (numberYes + numberMaybe + numberNo) === 1 ? 
              <Text style={styles.yetToRespond}>1 person is yet to respond</Text> : 
              <Text style={styles.yetToRespond}>{numberOfParticipants - (numberYes + numberMaybe + numberNo)} people are yet to respond</Text>}
            </View>
            <Text style={styles.responseHeading}>Your Response</Text>
            <View style={styles.userResponseButtons}>
              <RadioButton
                value="yes"
                status={checked === 'yes' ? 'checked' : 'unchecked'}
                onPress={() => { setChecked('yes') }}
                color={PRIMARY}
              />
              <Text style={styles.userResponseLabel}>Yes</Text>
              <RadioButton
                value="maybe"
                status={checked === 'maybe' ? 'checked' : 'unchecked'}
                onPress={() => { setChecked('maybe') }}
                color={PRIMARY}
              />
              <Text style={styles.userResponseLabel}>Maybe</Text>
              <RadioButton
                value="no"
                status={checked === 'no' ? 'checked' : 'unchecked'}
                onPress={() => { setChecked('no') }}
                color={PRIMARY}
              />
              <Text style={styles.userResponseLabel}>No</Text>
            </View>
            <FormButtonSmall
              // onPress={() => {
              //   handleSignIn(email, password);
              // }}
              buttonTitle={'Respond'}
            />
        </View>
      )
    };

    return (
        <View style={styles.screenContainer}>
            <Header navigation={navigation} />
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={event}
                        renderItem={({item}) => <DetailedEvent eventName={item.name} schedule={item.schedule} hostedBy={item.createdBy[0].name} />}
                        keyExtractor={item => item._id}
                        showsVerticalScrollIndicator ={false}>
                    </FlatList>
                </SafeAreaView>
        </View>
    )
}

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
    heading: {
      fontSize: 35,
      fontWeight: "bold",
      marginBottom: 27,
      paddingLeft: '9%'
    },
    eventCard: {
      paddingHorizontal: '10%',
      paddingVertical: '6%',
      backgroundColor: '#fff',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {width: 2, height: 3},
      shadowOpacity: 0.8,
      shadowRadius: 10,
      elevation: 2,
      marginBottom: '6%',
    },
    eventHeading: {
      fontSize: 26,
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
      fontSize: 14,
    },
    verticalComponent: {
      marginTop: '2%',
      marginBottom: '8%',
    },
    eventSchedule: {
      fontSize: 16,
      fontWeight: 'bold',
      color: HEADING,
      paddingTop: 5,
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
      marginBottom: -5
    },
    responseHeading: {
      fontSize: 20,
      fontWeight: 'bold',
      color: HEADING,
      marginBottom: 8,
    },
    eventData: {
      marginLeft: 28
    }, 
    eventResponse: {
      fontSize: 15
    },
    yetToRespond: {
      textAlign: 'right',
      marginVertical: 10,
      color: PLACEHOLDER,
      fontSize: 13
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
    }
});

export default Event;