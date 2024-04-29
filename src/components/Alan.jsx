import React, { useContext, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

import { ColorModeContext } from "../utils/ToggleColorMode";
import { fetchToken } from "../utils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  searchMovie,
  selectGenreOrCategory,
} from "../features/currentGenreorCategory";

const useAlan = () => {
  const { setMode } = useContext(ColorModeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    alanBtn({
      key: "cccdc344eadc7e87ef362fbd5114b4ec2e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({ command, mode, genres, genreOrCategory, query }) => {
        if (command === "chooseGenre") {
          const foundGenre = genres.find(
            (g) => g.name.toLowerCase() === genreOrCategory.toLowerCase()
          );

          if (foundGenre) {
            // if its a genre
            navigate("/");
            dispatch(selectGenreOrCategory(foundGenre.id));
          } else {
            // if its a category
            const category = genreOrCategory.startsWith("top")
              ? "top_rated"
              : genreOrCategory;
            navigate("/");
            dispatch(selectGenreOrCategory(category));
          }
        } else if (command === "changeMode") {
          if (mode === "light") {
            setMode("dark");
          } else {
            setMode("light");
          }
        } else if (command === "login") {
          fetchToken();
        } else if (command === "logout") {
          localStorage.clear();
          window.location.href = "/";
        } else if (command === "search") {
          dispatch(searchMovie(query));
        }
      },
    });
  }, []);

  return <div />;
};

export default useAlan;
