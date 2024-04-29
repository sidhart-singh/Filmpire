import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = import.meta.env.VITE_APP_TMDB_KEY;
// https://api.themoviedb.org/3/movie/popular?language=en-US&page=1

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
  endpoints: (builder) => ({
    // Get genres
    getGenres: builder.query({
      query: () => `/genre/movie/list?api_key=${tmdbApiKey}`,
    }),

    // Get Movies by [Type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        // getMoviesBySearch
        if (searchQuery) {
          return `search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
        }

        // getMoviesByCategories
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "string"
        ) {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }

        // getMoviesByGenre
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "number"
        ) {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
        }

        // get popular movies
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),

    // getMovie
    getMovie: builder.query({
      query: (id) =>
        `movie/${id}?api_key=${tmdbApiKey}&append_to_response=videos,credits`,
    }),

    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) =>
        `account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`,
    }),

    // getUserSpecificList
    getRecommendations: builder.query({
      query: ({ movie_id, list }) =>
        `movie/${movie_id}/${list}?api_key=${tmdbApiKey}`,
    }),

    // getActorDetails
    getActorsDetails: builder.query({
      query: (id) => `person/${id}?api_key=${tmdbApiKey}`,
    }),

    // get movies by actor id
    getMoviesByActorsId: builder.query({
      query: ({ id, page }) =>
        `discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`,
    }),
  }),
});

export const {
  useGetGenresQuery,
  useGetMoviesQuery,
  useGetMovieQuery,
  useGetListQuery,
  useGetRecommendationsQuery,
  useGetActorsDetailsQuery,
  useGetMoviesByActorsIdQuery,
} = tmdbApi;
