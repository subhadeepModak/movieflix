import queryString from 'query-string';

const MOVIE_API_BASE_URL = 'https://api.themoviedb.org/3/discover/movie';
export const API_KEY = '2dca580c2a14b55200e784d157207b4d';

export const movieApi = (params: any) =>
  fetch(
    `${MOVIE_API_BASE_URL}?${queryString.stringify({
      api_key: API_KEY,
      ...params,
    })}`,
  );
