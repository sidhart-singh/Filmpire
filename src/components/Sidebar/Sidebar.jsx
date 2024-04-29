import React, { useEffect } from "react";
import {
  Box,
  CircularProgress,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./styles";
import genreIcons from "../../assets/genres";
import { useGetGenresQuery } from "../../services/TMDB";
import { selectGenreOrCategory } from "../../features/currentGenreorCategory";

const redLogo =
  "https://fontmeme.com/permalink/240429/74f24fec33191ad7415ba5340c37fe08.png";
const blueLogo =
  "https://fontmeme.com/permalink/240429/36efc2baf2aeb978e9920406ac98c7bf.png";

const categories = [
  { label: "Popular", value: "popular" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Top Rated", value: "top_rated" },
];

const Sidebar = ({ setMobileOpen }) => {
  const theme = useTheme();
  const classes = useStyles();
  const { data, error, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();
  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );

  useEffect(() => {
    setMobileOpen(false);
  }, [genreIdOrCategoryName]);

  return (
    <>
      <Link to={"/"} className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === "light" ? redLogo : blueLogo}
          alt="Filmpire Logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to={"/"}>
            <ListItemButton
              onClick={() => dispatch(selectGenreOrCategory(value))}
            >
              <ListItemIcon>
                <img
                  src={genreIcons[label.toLowerCase()]}
                  className={classes.genreImage}
                  height={30}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display={"flex"} justifyContent={"center"}>
            <CircularProgress />
          </Box>
        ) : (
          data.genres.map(({ name, id }) => (
            <Link key={name} className={classes.links} to={"/"}>
              <ListItemButton
                onClick={() => dispatch(selectGenreOrCategory(id))}
              >
                <ListItemIcon>
                  <img
                    src={genreIcons[name.toLowerCase()]}
                    className={classes.genreImage}
                    height={30}
                  />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </Link>
          ))
        )}
      </List>
    </>
  );
};

export default Sidebar;
