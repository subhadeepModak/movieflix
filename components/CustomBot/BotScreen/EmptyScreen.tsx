import {Image, Text, View} from 'react-native';
import styles from './styles';
import React from 'react';

const EmptyScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/bot.gif')} style={styles.img} />
      <Text style={styles.text}>How can I help you ?</Text>
    </View>
  );
};

export default EmptyScreen;
