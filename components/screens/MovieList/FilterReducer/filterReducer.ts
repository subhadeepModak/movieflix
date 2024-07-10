export const INITIAL_FILTER_VALUE = {
  with_genres: [],
  isFilterChanging: false,
  movieList: [],
};

export const filterReducer = (
  state: {with_genres: any[]},
  action: {type: any; payload: any},
) => {
  const {type, payload} = action;
  switch (type) {
    case 'ADD_GENRES_FILTER': {
      return {
        ...state,
        with_genres: [...state.with_genres, payload],
        movieList: [],
      };
    }
    case 'REMOVE_GENRES_FILTER': {
      return {
        ...state,
        with_genres: state.with_genres.filter((item: any) => item !== payload),
        movieList: [],
      };
    }
    case 'UPDATE_MOVIE_LIST': {
      return {
        ...state,
        movieList: payload,
      };
    }

    default: {
      return {...state};
    }
  }
};
