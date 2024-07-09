import {View, Image} from 'react-native';
import React from 'react';
import logo from '../../assets/logo.png';
import styles from './styles';

const AppHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={logo}
        alt="logo"
        style={styles.logo}
      />
    </View>
  );
};

export default AppHeader;
