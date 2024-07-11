import {View, Image} from 'react-native';
import React from 'react';
import logo from '../../assets/logo.png';
import styles from './styles';
import SearchInput from '../common/SearchInput';

const AppHeader = ({handleOnChange, filterValue}) => {
  return (
    <View style={styles.headerContainer}>
      <Image source={logo} alt="logo" style={styles.logo} />
      <SearchInput onChangeText={handleOnChange} value={filterValue} />
    </View>
  );
};

export default AppHeader;
