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
  const {setUser, user} = useContext(UserContext);
  const windowHeight = Dimensions.get('window').height;

  // const chartConfig = {
  //   backgroundGradientFrom: '#1E2923',
  //   backgroundGradientFromOpacity: 0,
  //   backgroundGradientTo: '#08130D',
  //   backgroundGradientToOpacity: 0.5,
  //   color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  //   strokeWidth: 2, // optional, default 3
  //   barPercentage: 0.5,
  //   useShadowColorFromDataset: false, // optional
  // };

  useEffect(() => {
    setIsLoading(value => !value);
    getEvents();
  }, []);

  const getEvents = async () => {
    const response = await event();
    const eventArray = Object.values(response.data.events);
    setEvents(eventArray);
    getUserResponse(eventArray);
    setIsLoading(value => !value);
  };

  const getUserResponse = events => {
    console.log(events);
    let userResponse;
    let yesCount = 0,
      noCount = 0,
      maybeCount = 0,
      notResponded = 0;

    for (e of events) {
      console.log(e + '\n');
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

    const responseStats = [
      {name: 'Yes', number: yesCount, color: SECONDARY},
      {name: 'No', number: noCount, color: PRIMARY},
      {name: 'Maybe', number: maybeCount, color: SEPARATOR},
    ];

    setResponseChart(responseStats);

    setYesPercentage(
      (
        (yesCount / (yesCount + noCount + maybeCount + notResponded)) *
        100
      ).toFixed(1),
    );
    setMaybePercentage(
      (
        (maybeCount / (yesCount + noCount + maybeCount + notResponded)) *
        100
      ).toFixed(1),
    );
    setNoPercentage(
      (
        (noCount / (yesCount + noCount + maybeCount + notResponded)) *
        100
      ).toFixed(1),
    );

    console.log(yesPercentage);
  };

  return (
    <>
      <View style={styles.screenContainer}>
        <Header navigation={navigation} />
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.heading}>Dashboard</Text>
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

            <View style={styles.yesCircle}>
              <AnimatedCircularProgress
                size={270}
                width={15}
                backgroundWidth={5}
                fill={yesPercentage}
                tintColor={SECONDARY}
                backgroundColor="#F0F0F0"
                rotation={0}
                duration={1500}
                lineCap={'round'}
              />
              <View style={styles.out}>
                <AnimatedCircularProgress
                  size={200}
                  width={15}
                  backgroundWidth={5}
                  fill={maybePercentage}
                  tintColor={PLACEHOLDER}
                  backgroundColor="#F0F0F0"
                  rotation={0}
                  duration={1500}
                  lineCap={'round'}
                />
                <View style={styles.in}>
                  <AnimatedCircularProgress
                    size={130}
                    width={15}
                    backgroundWidth={5}
                    fill={noPercentage}
                    tintColor={PRIMARY}
                    backgroundColor="#F0F0F0"
                    rotation={0}
                    duration={1500}
                    lineCap={'round'}
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
    padding: '10%',
    height: Dimensions.get('window').height,
  },
  heading: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: '13%',
  },
  subHeading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: HEADING,
  },
  pieChart: {
    padding: '10%',
    elevation: 10,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: '22%',
    marginLeft: '-15%',
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
    fontSize: 15,
  },
  yesCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: '10%',
  },
  out: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '-75%',
  },
  in: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '-47%',
  },
});

export default Dashboard;
