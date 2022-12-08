import React from "react";
import StoryCard from "../../components/StoryCard/StoryCard";

import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { getSavedStories } from "../../utilities/news-api";

export default function TopStoryPage({
  topStories,
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
    <Box className="page-body" sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 2, md: 8, lg: 12 }}
      >
        {topStories.length > 0 &&
          topStories.map((story, idx) => {
            {
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
            }
          })}
      </Grid>
    </Box>
  );
}
