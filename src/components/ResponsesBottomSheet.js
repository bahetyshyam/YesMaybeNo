import React, {useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {HEADING} from '../styles/colors';
import ResponsesCircularProgress from '../components/ResponsesCircularProgress';

const ResponsesBottomSheet = ({reference, category, number, color}) => {
  return (
    <RBSheet
      ref={reference}
      closeOnDragDown={true}
      closeOnPressMask={true}
      animationType={'slide'}
      openDuration={300}
      closeDuration={300}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(52, 52, 52, 0.7)',
        },
        draggableIcon: {
          backgroundColor: HEADING,
        },
        container: {
          borderRadius: 10,
          height: '70%',
        },
      }}>
      <View style={styles.mainContainer}>
        <View style={styles.progressBar}>
          <ResponsesCircularProgress number={number} color={color} />
          <Text style={styles.progressText}>{category}</Text>
        </View>
      </View>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '10%',
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: '5%',
  },
});

export default ResponsesBottomSheet;
