import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { FeaturedMovie, MovieList, Pagination } from "..";
import { useGetMoviesQuery } from "../../services/TMDB";

const Movies = () => {
  const [page, setPage] = useState(1);
  const lg = useMediaQuery((theme) => theme.breakpoints.only("lg"));
  const numberOfMovies = lg ? 17 : 19;
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });

  if (isFetching) {
    return (
      <Box display={"flex"} justifyContent={"center"}>
        <CircularProgress size={"4rem"} />
      </Box>
    );
  }

  if (!data.results.length) {
    return (
      <Box display={"flex"} alignItems={"center"} mt={"20px"}>
        <Typography variant="h4">
          No movies that match than name. <br /> Please search for something
          else
        </Typography>
      </Box>
    );
  }

  if (error) {
    return "An error occured";
  }

  return (
    <div>
      <FeaturedMovie movie={data.results[0]} />
      <MovieList movies={data} numberOfMovies={numberOfMovies} excludeFirst />
      <Pagination
        currentPage={page}
        setPage={setPage}
        totalPages={data?.total_pages}
      />
    </div>
  );
};

export default Movies;
