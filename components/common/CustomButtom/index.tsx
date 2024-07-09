import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
const CustomButton = ({
  id,
  value,
  onPress,
}: {
  id: string;
  value: string;
  onPress: () => void;
}) => (
  <TouchableOpacity key={id} onPress={onPress} style={styles.btn}>
    <Text style={styles.text}>{value}</Text>
  </TouchableOpacity>
);

export default CustomButton;
