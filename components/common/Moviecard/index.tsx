import React from 'react';
import {Image, Text, View} from 'react-native';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w220_and_h330_face';

const MovieCard = ({item}) => {
  const {poster_path, title, vote_average} = item;

  if (item?.type === 'label') {
    return (
      <View style={{display: 'flex', height: 40}}>
        <Text
          style={{
            fontWeight: 'bold',
            padding: 5,
            color: 'white',
            fontSize: 24,
          }}>
          {item.value}
        </Text>
      </View>
    );
  }
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: 250,
        width: '49%',
        borderRadius: 5,
        position: 'relative',
      }}>
      <Image
        source={{uri: `${IMAGE_BASE_URL + poster_path}`}}
        alt="poster"
        style={{height: '100%', width: 'auto', borderRadius: 5}}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          padding: 2,
          backgroundColor: 'rgba(98, 107, 120)',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: '16px',
          }}>
          {title}
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: '16px',
          }}>{`${vote_average.toFixed(1)} / 10`}</Text>
      </View>
    </View>
  );
};

export default MovieCard;
