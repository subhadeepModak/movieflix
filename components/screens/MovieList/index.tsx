/* eslint-disable react-native/no-inline-styles */
import {SafeAreaView, View} from 'react-native';
import React from 'react';
import AppHeader from '../../headers';
import styles from './styles';
import Genre from '../../genre';
import MovieCard from '../../common/Moviecard';
import {movieApi} from './api';
import InfiniteScrollList from '../../common/InfiniteScrollList';

const MovieList = () => {
  const handleLoadMovies = async (year: number) => {
    try {
      const response = await movieApi({
        page: '1',
        sort_by: 'popularity.desc',
        primary_release_year: year,
        'vote_count.gte': 100,
      });
      const data = await response.json();
      return [
        {id: year, value: year, type: 'label'},
        {id: `${year}_blank`, value: '', type: 'label'},
        ...data.results,
      ];
    } catch (e) {
      console.log('error fetching movies', e);
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader />
      <Genre />
      <SafeAreaView style={{flex: 1}}>
        <InfiniteScrollList
          fetchData={handleLoadMovies}
          renderItem={({item} : any) => <MovieCard item={item} />}
          numColumns={2}
          contentContainerStyle={{
            gap: 8,
            paddingTop: 20,
            paddingBottom: 30,
            paddingHorizontal: 10,
          }}
          columnWrapperStyle={{gap: 8}}
          defaultPage={2012}
        />
      </SafeAreaView>
    </View>
  );
};

export default MovieList;
