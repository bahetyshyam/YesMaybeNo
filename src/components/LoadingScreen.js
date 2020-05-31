import React from 'react';
import {StyleSheet} from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';

const LoadingScreen = (props) => {
    return (
        <AnimatedLoader
              visible={props.visible}
              overlayColor="rgba(83, 83, 83,0.90)"
              source={require('../assets/images/loading animation.json')}
              animationStyle={styles.lottie}
              speed={1}
            />
    );
};

const styles = StyleSheet.create({
    lottie: {
        width: 70,
        height: 70
    }
});

export default LoadingScreen;
