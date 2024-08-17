import {Text, View} from 'react-native';
import React from 'react';
import LoadingDots from 'react-native-loading-dots';
import styles from './styles';

export const ChatView = ({item, isLoading}: any) => {
  const {role, content} = item;

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingWrapper}>
          <LoadingDots />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {role === 'user' ? (
        <View style={styles.question}>
          <Text style={styles.user}>{'You'}</Text>
          <Text style={styles.text}>{content}</Text>
        </View>
      ) : (
        <View style={styles.response}>
          <Text style={styles.user}>{'Assistant'}</Text>
          <Text style={styles.text}>{content}</Text>
        </View>
      )}
    </View>
  );
};

export default ChatView;
