import {Text, View} from 'react-native';
import React from 'react';
import styles from './styles';

export const ChatView = ({item}: any) => {
  const {role, content} = item;

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
