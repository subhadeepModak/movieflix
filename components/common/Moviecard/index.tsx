import React from 'react';
import {Image, Text, View} from 'react-native';
import styles from './styles';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w220_and_h330_face';

const MovieCard = ({item}: {item: any}) => {
  const {poster_path, title, vote_average} = item;

  if (item?.type === 'label') {
    return (
      <View style={styles.labelContainer}>
        <Text style={styles.yearLabel}>{item.value}</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Image
        source={{uri: `${IMAGE_BASE_URL + poster_path}`}}
        alt="poster"
        style={styles.poster}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.ratings}>{`${vote_average.toFixed(1)} / 10`}</Text>
      </View>
    </View>
  );
};

export default React.memo(MovieCard);
