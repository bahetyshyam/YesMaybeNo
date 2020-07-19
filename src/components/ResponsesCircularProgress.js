import React from 'react';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {PRIMARY, HEADING, PLACEHOLDER, SECONDARY} from '../styles/colors';

const ResponsesCircularProgress = ({number, color}) => {
  return (
    <AnimatedCircularProgress
      size={130}
      width={15}
      backgroundWidth={5}
      fill={number}
      tintColor={color}
      backgroundColor="#F0F0F0"
      rotation={0}
      duration={1500}
    />
  );
};

export default ResponsesCircularProgress;
