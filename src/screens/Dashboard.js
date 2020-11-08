import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, Text, View, Button, ScrollView} from 'react-native';
import Header from '../components/Header';
import {event} from '../api/index';
import {
  PRIMARY,
  SECONDARY,
  PLACEHOLDER,
  HEADING,
  SEPARATOR,
} from '../styles/colors';
import {UserContext} from '../navigation/AppNavigator';
import Yes from '../assets/images/Green bubble.svg';
import Maybe from '../assets/images/Grey bubble.svg';
import No from '../assets/images/Red bubble.svg';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Dimensions} from 'react-native';

const Dashboard = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [data, setResponseChart] = useState([]);
  const [yesPercentage, setYesPercentage] = useState(0);
  const [maybePercentage, setMaybePercentage] = useState(0);
  const [noPercentage, setNoPercentage] = useState(0);
  const [yesCount, setYesCount] = useState(0);
  const [maybeCount, setMaybeCount] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [notRespondedCount, setNotRespondedCount] = useState(0);
  const {setUser, user} = useContext(UserContext);
  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    // setIsLoading(value => !value);
    // getEvents();
    const unsubscribe = navigation.addListener('focus', () => {
      getEvents();
    });
    return unsubscribe;
  }, [navigation]);

  const getEvents = async () => {
    const response = await event();
    const eventArray = Object.values(response.data.events);
    setEvents(eventArray);
    getUserResponse(eventArray);
  };

  const getUserResponse = events => {
    let userResponse;
    let yesCount = 0,
      noCount = 0,
      maybeCount = 0,
      notResponded = 0;

    for (e of events) {
      if (e.responses.length === 0) notResponded += 1;
      for (response of e.responses)
        if (response.user === user._id) {
          userResponse = response.response;
          break;
        }

      if (userResponse === 'yes') yesCount += 1;
      else if (userResponse === 'no') noCount += 1;
      else if (userResponse === 'maybe') maybeCount += 1;
      else notResponded += 1;
    }

    let totalCount = yesCount + noCount + maybeCount + notResponded;

    setYesCount(yesCount);
    setNoCount(noCount);
    setMaybeCount(maybeCount);
    setNotRespondedCount(notResponded);

    const responseStats = [
      {name: 'Yes', number: yesCount, color: SECONDARY},
      {name: 'No', number: noCount, color: PRIMARY},
      {name: 'Maybe', number: maybeCount, color: SEPARATOR},
    ];

    setResponseChart(responseStats);

    setYesPercentage(
      Math.round(
        (yesCount / (yesCount + noCount + maybeCount + notResponded)) *
        100
      )
    );
    setMaybePercentage(
      Math.round(
        (maybeCount / (yesCount + noCount + maybeCount + notResponded)) *
        100
      )
    );
    setNoPercentage(
      Math.round(
        (noCount / (yesCount + noCount + maybeCount + notResponded)) *
        100
      )
    );
  };

  return (
    <>
      <View style={styles.screenContainer}>
        <Header navigation={navigation} />
        <ScrollView>
          <View style={styles.container}>
            {/* <Text style={styles.heading}>Dashboard</Text> */}
            <Text style={styles.subHeading}>Responses Overview</Text>
            {/* <PieChart
              data={data}
              width={500}
              height={300}
              chartConfig={chartConfig}
              accessor="number"
              hasLegend={false}
              style={styles.pieChart}
            /> */}
            <View style={styles.responsesOverview}>
              <View style={styles.yesCircle}>
                <AnimatedCircularProgress
                  size={280}
                  width={15}
                  backgroundWidth={5}
                  fill={yesPercentage}
                  tintColor={SECONDARY}
                  backgroundColor="#F2F2F2"
                  rotation={0}
                  duration={0}
                  // lineCap={'round'}
                />
                <View style={styles.out}>
                  <AnimatedCircularProgress
                    size={210}
                    width={15}
                    backgroundWidth={5}
                    fill={maybePercentage}
                    tintColor={PLACEHOLDER}
                    backgroundColor="#F2F2F2"
                    rotation={0}
                    duration={0}
                    // lineCap={'round'}
                  />
                  <View style={styles.in}>
                    <AnimatedCircularProgress
                      size={135}
                      width={15}
                      backgroundWidth={5}
                      fill={noPercentage}
                      tintColor={PRIMARY}
                      backgroundColor="#F2F2F2"
                      rotation={0}
                      duration={0}
                      // lineCap={'round'}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.legend}>
                <View style={styles.bubble}>
                  <Yes />
                  <Text style={styles.percentage}>{yesPercentage}%</Text>
                </View>
                <View style={styles.bubble}>
                  <Maybe />
                  <Text style={styles.percentage}>{maybePercentage}%</Text>
                </View>
                <View style={styles.bubble}>
                  <No />
                  <Text style={styles.percentage}>{noPercentage}%</Text>
                </View>
              </View>
            </View>
            <View style={styles.eventHistory}>
              <Text style={styles.subHeading}>Events History</Text>
              <View style={styles.yesEventHistory}>
                <View style={styles.yesEventHistoryText}>
                  <Text style={styles.yesEventHistoryTextHeading}>Yes</Text>
                  <Text style={styles.yesEventHistoryTextDesc}>
                    You've responded yes to {yesCount} out of{' '}
                    {yesCount + noCount + maybeCount + notRespondedCount} events
                  </Text>
                </View>
                <View style={styles.progress}>
                  <AnimatedCircularProgress
                    size={100}
                    width={12}
                    backgroundWidth={5}
                    fill={yesPercentage}
                    tintColor={SECONDARY}
                    backgroundColor="#fff"
                    rotation={0}
                    duration={1500}
                    // lineCap={'round'}
                  />
                </View>
              </View>
              <View style={styles.maybeEventHistory}>
                <View style={styles.yesEventHistoryText}>
                  <Text style={styles.yesEventHistoryTextHeading}>Maybe</Text>
                  <Text style={styles.yesEventHistoryTextDesc}>
                    You've responded yes to {maybeCount} out of{' '}
                    {yesCount + noCount + maybeCount + notRespondedCount} events
                  </Text>
                </View>
                <View style={styles.progress}>
                  <AnimatedCircularProgress
                    size={100}
                    width={12}
                    backgroundWidth={5}
                    fill={maybePercentage}
                    tintColor={PLACEHOLDER}
                    backgroundColor="#fff"
                    rotation={0}
                    duration={1500}
                    // lineCap={'round'}
                  />
                </View>
              </View>
              <View style={styles.noEventHistory}>
                <View style={styles.yesEventHistoryText}>
                  <Text style={styles.yesEventHistoryTextHeading}>No</Text>
                  <Text style={styles.yesEventHistoryTextDesc}>
                    You've responded yes to {noCount} out of{' '}
                    {yesCount + noCount + maybeCount + notRespondedCount} events
                  </Text>
                </View>
                <View style={styles.progress}>
                  <AnimatedCircularProgress
                    size={100}
                    width={12}
                    backgroundWidth={5}
                    fill={noPercentage}
                    tintColor={PRIMARY}
                    backgroundColor="#fff"
                    rotation={0}
                    duration={1500}
                    // lineCap={'round'}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  container: {
    backgroundColor: '#fff',
    padding: '7%',
    // height: Dimensions.get('window').height,
  },
  heading: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: '10%',
  },
  subHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: '5%',
  },
  pieChart: {
    padding: '10%',
    elevation: 10,
  },
  responsesOverview: {
    backgroundColor: '#fff',
    paddingHorizontal: '10%',
    paddingVertical: '5%',
    borderRadius: 10,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '20%',
    marginLeft: '-20%',
  },
  bubble: {
    width: 50,
    height: 50,
    marginTop: 3,
    flexDirection: 'row',
    elevation: 10,
  },
  percentage: {
    marginVertical: '25%',
    fontWeight: 'bold',
    fontSize: 14,
  },
  yesCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: '15%',
    marginTop: '5%',
  },
  out: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '-90%',
  },
  in: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '-57%',
  },
  eventHistory: {
    marginVertical: '10%',
  },
  yesEventHistory: {
    flexDirection: 'row',
    backgroundColor: '#E6FFE5',
    paddingHorizontal: '7%',
    paddingVertical: '5%',
    marginBottom: '5%',
    borderRadius: 5,
    borderBottomColor: SECONDARY,
    borderBottomWidth: 3
  },
  maybeEventHistory: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    paddingHorizontal: '7%',
    paddingVertical: '5%',
    marginBottom: '5%',
    borderRadius: 5,
    borderBottomColor: PLACEHOLDER,
    borderBottomWidth: 3
  },
  noEventHistory: {
    flexDirection: 'row',
    backgroundColor: '#FFDBDB',
    paddingHorizontal: '7%',
    paddingVertical: '5%',
    borderRadius: 5,
    borderBottomColor: PRIMARY,
    borderBottomWidth: 3,
  },
  yesEventHistoryText: {
    paddingVertical: '5%',
  },
  yesEventHistoryTextHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: '3%',
  },
  yesEventHistoryTextDesc: {
    fontSize: 14,
    width: '60%',
  },
  progress: {
    marginLeft: '-25%',
  },
});

export default Dashboard;
