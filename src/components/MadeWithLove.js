import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

const MadeWithLove = () => {
    return (
        <View style={styles.madeWithLove}>
          <Text style={styles.madeWithLoveText}>Made with</Text>
          <Image
              source={require('../assets/images/box.png')}
              style={styles.loveLogo}
            />
          <Text style={styles.madeWithLoveText}>in India</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    madeWithLove: {
        flex: 1,
        flexDirection: 'row',
        marginTop: '30%'
      },
      loveLogo: {
        width: 50,
        height: 50,
        marginHorizontal: '5%'
      },
      madeWithLoveText: {
        fontWeight: 'bold',
        marginTop: '10%'
      }
});

export default MadeWithLove;