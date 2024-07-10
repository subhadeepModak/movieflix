import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
const CustomButton = ({
  id,
  value,
  onPress,
  isActive,
}: {
  id: string;
  value: string;
  onPress: (id: number) => void;
  isActive: boolean;
}) => (
  <TouchableOpacity
    key={id}
    onPress={() => onPress(id)}
    style={{...styles.btn, ...(isActive ? styles.active : {})}}>
    <Text style={styles.text}>{value}</Text>
  </TouchableOpacity>
);

export default CustomButton;
