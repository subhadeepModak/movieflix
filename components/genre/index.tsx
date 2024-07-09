import {FlatList, SafeAreaView} from 'react-native';
import React from 'react';
import GENRE_LIST from './constant';
import CustomButton from '../common/CustomButtom';
import styles from './styles';

const Genre = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        horizontal
        data={GENRE_LIST}
        keyExtractor={item => item.id}
        renderItem={({item}) =>
          <CustomButton id={item.id} value={item.value} onPress={() => {}} />
        }
      />
    </SafeAreaView>
  );
};

export default Genre;
