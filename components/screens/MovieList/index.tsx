/* eslint-disable react-native/no-inline-styles */
import {SafeAreaView, View} from 'react-native';
import React, {useEffect, useReducer, useState} from 'react';
import AppHeader from '../../headers';
import styles from './styles';
import Genre from '../../genre';
import MovieCard from '../../common/Moviecard';
import {genresApi, movieApi} from './api';
import InfiniteScrollList from '../../common/InfiniteScrollList';
import {
  INITIAL_FILTER_VALUE,
  filterReducer,
} from './FilterReducer/filterReducer';

const formattedResult = (res: {results: any}, year: any) => {
  return [
    {id: year, value: year, type: 'label'},
    {id: `${year}_blank`, value: '', type: 'label'},
    ...res.results,
  ];
};
const MovieList = () => {
  const [filter, dispatch] = useReducer(filterReducer, INITIAL_FILTER_VALUE);
  const [genreList, setGenreList] = useState([]);

  const loadGenres = async () => {
    try {
      const res = await genresApi();
      const data = await res.json();
      if (data?.genres) {
        setGenreList(data.genres);
      }
    } catch (err) {
      console.log('Error on fetching Genres', err);
    }
  };
  useEffect(() => {
    if (genreList.length === 0) loadGenres();
  }, []);

  const handleLoadMovies = async (year: number, direction: string) => {
    try {
      const response = await movieApi({
        page: '1',
        sort_by: 'popularity.desc',
        primary_release_year: year,
        'vote_count.gte': 100,
        with_genres: filter.with_genres.join(','),
      });
      const data = await response.json();
      if (direction === 'up') {
        const res = formattedResult(data, year);

        const updatedList = [...res, ...filter.movieList];
        dispatch({type: 'UPDATE_MOVIE_LIST', payload: updatedList});
      } else {
        const res = formattedResult(data, year);
        const updatedList = [...filter.movieList, ...res];
        dispatch({type: 'UPDATE_MOVIE_LIST', payload: updatedList});
      }
      return true;
    } catch (e) {
      console.log('error fetching movies', e);
    }
  };

  const onGenreSelect = async (id: string) => {
    if (filter.with_genres.includes(id)) {
      await dispatch({
        type: 'REMOVE_GENRES_FILTER',
        payload: id,
      });
      const res = await handleLoadMovies(2012, 'down');
      dispatch({
        type: 'UPDATE_MOVIE_LIST',
        payload: res,
      });
    } else {
      await dispatch({type: 'ADD_GENRES_FILTER', payload: id});
      const res = await handleLoadMovies(2012, 'down');
      dispatch({
        type: 'UPDATE_MOVIE_LIST',
        payload: res,
      });
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader />
      <Genre
        genres={genreList}
        onSelect={onGenreSelect}
        selectedGenres={filter.with_genres}
      />
      <SafeAreaView style={{flex: 1}}>
        <InfiniteScrollList
          fetchData={handleLoadMovies}
          data={filter.movieList}
          renderItem={({item}: any) => <MovieCard item={item} />}
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
