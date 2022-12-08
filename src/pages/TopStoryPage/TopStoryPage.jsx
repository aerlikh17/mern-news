import React from "react";
import StoryCard from "../../components/StoryCard/StoryCard";

import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

export default function TopStoryPage({ topStories, user, setCurrentStory }) {
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
        {topStories.map((story, idx) => {
          return (
            <Grid item xs={2} sm={4} md={4} key={idx} id="gridItem">
              <StoryCard
                story={story}
                key={idx}
                user={user}
                setCurrentStory={setCurrentStory}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
