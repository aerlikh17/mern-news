import React from "react";
import StoryCard from "../../components/StoryCard/StoryCard";

import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { getSavedStories } from "../../utilities/news-api";

export default function TopStoryPage({
  topStories,
  savedStories,
  setSavedStories,
  handleDelete,
  setCurrentStory,
  isSaved,
  setIsSaved,
}) {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  console.log(savedStories);
  return (
    <Box className="page-body" sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 8, md: 12 }}
      >
        {topStories.length > 0 &&
          topStories.map((story, idx) => {
            {
              setIsSaved(false);
            }
            {
              savedStories.forEach(function (saved) {
                if (saved.url === story.url) {
                  story.saved = true;
                }
              });
            }

            {
              return (
                <Grid item xs={2} sm={4} md={4} key={idx}>
                  <StoryCard
                    key={idx}
                    story={story}
                    savedStories={savedStories}
                    setSavedStories={setSavedStories}
                    handleDelete={handleDelete}
                    setCurrentStory={setCurrentStory}
                    isSaved={isSaved}
                  />
                </Grid>
              );
            }
          })}
      </Grid>
    </Box>
  );
}
