import React from 'react';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {PRIMARY, HEADING, PLACEHOLDER, SECONDARY} from '../styles/colors';

const ResponsesCircularProgress = () => {
  return (
    <AnimatedCircularProgress
      size={130}
      width={20}
      backgroundWidth={10}
      fill={33}
      tintColor={PLACEHOLDER}
      backgroundColor={HEADING}
      rotation={0}
      duration={1500}
    />
  );
};

export default ResponsesCircularProgress;
