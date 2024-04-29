import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useGetListQuery } from "../../services/TMDB";

import { RatedCards } from "..";

const Profile = () => {
  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({
    listName: "favorite/movies",
    accountId: localStorage.getItem("account_id"),
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const { data: watchlistMovies, refetch: refetchWatchlisted } =
    useGetListQuery({
      listName: "watchlist/movies",
      accountId: localStorage.getItem("account_id"),
      sessionId: localStorage.getItem("session_id"),
      page: 1,
    });

  useEffect(() => {
    refetchFavorites();
    refetchWatchlisted();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Button color="inherit" onClick={logout} endIcon={<Logout />}>
          Logout &nbsp;
        </Button>
      </Box>
      {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length ? (
        <Typography variant="h5">
          Add favourites or watchlist some moveis to see them here!
        </Typography>
      ) : (
        <Box display={"flex"} flexDirection={"column"} gap={4}>
          <RatedCards title="Favorite Movies" data={favoriteMovies} />
          <RatedCards title="Watchlist Movies" data={watchlistMovies} />
        </Box>
      )}
    </Box>
  );
};

export default Profile;
