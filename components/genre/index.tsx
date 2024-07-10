import {FlatList, SafeAreaView} from 'react-native';
import React from 'react';
import CustomButton from '../common/CustomButtom';
import styles from './styles';

const Genre = ({
  genres,
  onSelect,
  selectedGenres,
}: {
  genres: any;
  onSelect: any;
  selectedGenres: any;
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        horizontal
        data={genres}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <CustomButton
            id={item.id}
            value={item.name}
            onPress={onSelect}
            isActive={selectedGenres.includes(item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Genre;
