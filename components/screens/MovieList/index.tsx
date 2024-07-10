/* eslint-disable react-native/no-inline-styles */
import {ActivityIndicator, SafeAreaView, View} from 'react-native';
import React, {
  useEffect,
  useReducer,
  useState,
  useRef,
  useCallback,
} from 'react';
import AppHeader from '../../headers';
import styles from './styles';
import Genre from '../../genre';
import MovieCard from '../../common/Moviecard';
import {genresApi, movieApi} from './api';
import {
  INITIAL_FILTER_VALUE,
  filterReducer,
} from './FilterReducer/filterReducer';
import {FlatList} from 'react-native-bidirectional-infinite-scroll';
import {debounce} from 'lodash';

const formattedResult = (res: {results: any}, year: any) => {
  if (res.results.length)
    return [
      {id: year, value: year, type: 'label'},
      {id: `${year}_blank`, value: '', type: 'label'},
      ...res.results,
    ];
  else return [];
};

const DEFAULT_START_PAGE = 2012;

const MovieList = () => {
  const [filter, dispatch] = useReducer(filterReducer, INITIAL_FILTER_VALUE);
  const [genreList, setGenreList] = useState([]);
  const [startPage, setStartPage] = useState(DEFAULT_START_PAGE);
  const [endPage, setEndPage] = useState(DEFAULT_START_PAGE - 1);
  const [loading, setLoading] = useState(false);
  const [onStartReachedInProgress, setOnStartReachedInProgress] =
    useState(false);
  const [onEndReachedInProgress, setOnEndReachedInProgress] = useState(false);
  const listRef = useRef(null);

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

  const handleLoadMovies = useCallback(
    debounce(async (direction: string) => {
      if (loading) return;
      setLoading(true);

      try {
        const page = direction === 'up' ? startPage - 1 : endPage + 1;
        const response = await movieApi({
          page: '1',
          sort_by: 'popularity.desc',
          primary_release_year: page,
          'vote_count.gte': 100,
          with_genres: filter.with_genres.join(','),
        });

        const data = await response.json();
        const newItems = formattedResult(data, page);

        console.log(page, newItems.length, direction);

        if (direction === 'up') {
          setStartPage(page);
          dispatch({
            type: 'UPDATE_MOVIE_LIST',
            payload: [...newItems, ...filter.movieList],
          });
          setOnStartReachedInProgress(false);
        } else {
          setEndPage(page);
          dispatch({
            type: 'UPDATE_MOVIE_LIST',
            payload: [...filter.movieList, ...newItems],
          });
          setOnEndReachedInProgress(false);
        }
      } catch (e) {
        console.log('error fetching movies', e);
      } finally {
        setLoading(false);
      }
    }, 1500),
    [loading, startPage, endPage, filter],
  );

  const handleStartReached = () => {
    console.log('start');
    if (!onStartReachedInProgress || !onEndReachedInProgress) {
      setOnStartReachedInProgress(true);
      handleLoadMovies('up');
      return Promise.resolve(true);
    } else Promise.resolve(true);
  };

  const handleEndReached = () => {
    console.log('end');

    if (!onEndReachedInProgress || !onStartReachedInProgress) {
      setOnEndReachedInProgress(true);
      handleLoadMovies('down');
      return Promise.resolve(true);
    } else {
      return Promise.resolve(true);
    }
  };

  useEffect(() => {
    if (genreList.length === 0) loadGenres();
    if (filter.movieList.length === 0) handleLoadMovies('down');
  }, []);

  useEffect(() => {
    handleLoadMovies('down');
  }, [filter.with_genres]);
  const onGenreSelect = async (id: string) => {
    setStartPage(DEFAULT_START_PAGE);
    setEndPage(DEFAULT_START_PAGE - 1);
    if (filter.with_genres.includes(id)) {
      await dispatch({type: 'REMOVE_GENRES_FILTER', payload: id});
    } else {
      await dispatch({type: 'ADD_GENRES_FILTER', payload: id});
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
        {filter.movieList.length ? (
          <FlatList
            ref={listRef}
            data={filter.movieList}
            renderItem={({item}) => <MovieCard item={item} />}
            keyExtractor={item => item.id.toString()}
            onStartReached={handleStartReached}
            onEndReached={handleEndReached}
            showDefaultLoadingIndicators={true}
            onStartReachedThreshold={10}
            onEndReachedThreshold={10}
            activityIndicatorColor={'white'}
            HeaderLoadingIndicator={() =>
              onStartReachedInProgress && (
                <ActivityIndicator size="small" color="white" />
              )
            }
            FooterLoadingIndicator={() =>
              onEndReachedInProgress && (
                <ActivityIndicator size="small" color="white" />
              )
            }
            enableAutoscrollToTop={false}
            columnWrapperStyle={{gap: 8}}
            numColumns={2}
            contentContainerStyle={{
              gap: 8,
              paddingTop: 20,
              paddingBottom: 30,
              paddingHorizontal: 10,
            }}
          />
        ) : (
          <ActivityIndicator size="small" color="white" />
        )}
      </SafeAreaView>
    </View>
  );
};

export default MovieList;
