import {Image, StyleSheet, Text, View} from 'react-native';
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

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  img: {
    height: 200,
    width: 200,
  },
  text: {
    fontSize: 16,
    color: '#2abf4d',
    fontWeight: 'bold',
  },
});
