import React, { useState } from "react";

import useStyles from "./styles";
import { InputAdornment, TextField } from "@mui/material";
import { SearchRounded } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { searchMovie } from "../../features/currentGenreorCategory";
import { useLocation } from "react-router-dom";

const Search = () => {
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      dispatch(searchMovie(query));
    }
  };

  if (location.pathname !== "/") return null;

  return (
    <div className={classes.searchContainer}>
      <TextField
        variant="standard"
        value={query}
        onKeyDown={handleKeyPress}
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{
          className: classes.input,
          startAdornment: (
            <InputAdornment position="start">
              <SearchRounded />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default Search;
