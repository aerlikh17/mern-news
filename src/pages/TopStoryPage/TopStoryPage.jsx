import React from "react";
import StoryCard from "../../components/StoryCard/StoryCard";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function TopStoryPage({
  topStories,
  savedStories,
  setSavedStories,
  handleSave,
  handleDelete,
  setCurrentStory,
  user,
}) {
  return (
    <Box className="page-body" sx={{ flexGrow: 1 }}>
      <Paper
        elevation={4}
        sx={{
          backgroundColor: "#004aad",
          width: "100vw",
          height: "4rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          top: "-1.2rem",
        }}
      >
        <h1 className="font-link" style={{ color: "white", fontSize: "3rem" }}>
          Top Stories
        </h1>
      </Paper>
      <hr></hr>
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
