import React from "react";

import useStyles from "./styles";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const FeaturedMovie = ({ movie }) => {
  const classes = useStyles();

  if (!movie) return null;

  return (
    <Box
      component={Link}
      to={`movie/${movie.id}`}
      className={classes.featuredCardContainer}
    >
      <Card className={classes.card} classes={{ root: classes.cardRoot }}>
        <CardMedia
          media="picture"
          alt={movie.title}
          image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          title={movie.title}
          className={classes.cardMedia}
        />
        <CardContent
          className={classes.cardContent}
          classes={{ root: classes.cardContentRoot }}
        >
          <Typography variant="h5" gutterBottom>
            {movie.title}
          </Typography>
          <Typography variant="body2">{movie.overview}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FeaturedMovie;
