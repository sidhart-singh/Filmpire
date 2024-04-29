import React from "react";
import { Grid } from "@mui/material";
import { Movie } from "..";
import useStyles from "./styles";

const MovieList = ({ movies, numberOfMovies, excludeFirst }) => {
  const startFrom = excludeFirst ? 1 : 0;
  const classes = useStyles();
  // console.log(movies.results);

  return (
    <Grid container className={classes.moviesContainer}>
      {movies.results.slice(0, numberOfMovies).map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid>
  );
};

export default MovieList;
