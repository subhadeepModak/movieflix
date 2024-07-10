import queryString from 'query-string';

const API_BASE_URL = 'https://api.themoviedb.org/3';
export const API_KEY = '2dca580c2a14b55200e784d157207b4d';

// api for fetch movies
export const movieApi = (params: any) =>
  fetch(
    `${API_BASE_URL}/discover/movie?${queryString.stringify({
      api_key: API_KEY,
      ...params,
    })}`,
  );

// api for fetch genres
export const genresApi = () =>
  fetch(
    `${API_BASE_URL}/genre/movie/list?${queryString.stringify({
      api_key: API_KEY,
    })}`,
  );
