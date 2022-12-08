import React from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./SearchPage.css";
import StoryCard from "../../components/StoryCard/StoryCard";

import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

export default function SearchPage({
  getSearch,
  searchStories,
  savedStories,
  setSavedStories,
  handleSave,
  handleDelete,
  setCurrentStory,
  user,
}) {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <Box className="page-body" sx={{ flexGrow: 1 }}>
        <SearchBar getSearch={getSearch} />
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 2, md: 8, lg: 12 }}
        >
          {searchStories.length ? (
            searchStories.map((story, idx) => {
              story.saved = false;
              story._id = "";
              savedStories.forEach(function (saved) {
                if (saved.url === story.url && user.id === saved.id) {
                  story.saved = true;
                  story._id = saved._id;
                }
              });
              return (
                <Grid item xs={2} sm={4} md={4} key={idx} id="gridItem">
                  <StoryCard
                    key={idx}
                    story={story}
                    savedStories={savedStories}
                    setSavedStories={setSavedStories}
                    handleSave={handleSave}
                    handleDelete={handleDelete}
                    setCurrentStory={setCurrentStory}
                  />
                </Grid>
              );
            })
          ) : (
            <h4>Search</h4>
          )}
        </Grid>
      </Box>
    </>
  );
}
