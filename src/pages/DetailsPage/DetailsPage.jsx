import { useEffect } from "react";

import { Container, Typography, List, ListItem } from "@mui/material";
import { Paper } from "@mui/material";
import Button from "@mui/material/Button";

export default function DetailsPage({
  story,
  savedStories,
  setSavedStories,
  handleSave,
  handleDelete,
  user,
}) {
  function contentSplit() {
    let content = story.content.split("[+");
    return content[0];
  }

  story.saved = false;
  story._id = "";
  savedStories.forEach(function (saved) {
    if (saved.url === story.url && user.id === saved.id) {
      story.saved = true;
      story._id = saved._id;
    }
  });

  return (
    <div className="page-body">
      <Container maxWidth="md" sx={{ mx: "auto" }}>
        <Paper elevation1 sx={{ p: 5 }}>
          <img
            src={story.urlToImage}
            style={{ maxWidth: "100%", borderRadius: "10px" }}
          />
          <List>
            <Typography variant="h4" margin="1rem">
              {story.title}
            </Typography>
            {(savedStories && savedStories.includes(story)) || story.saved ? (
              <Button size="small" onClick={() => handleDelete(story._id)}>
                Unsave -
              </Button>
            ) : (
              <Button size="small" onClick={() => handleSave(story)}>
                Save +
              </Button>
            )}
            <ListItem>
              <Typography variant="h5">{story.description}</Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1">{contentSplit()}</Typography>
            </ListItem>
            <Button href={story.url} target="_blank">
              Read Full Article at {story.source.name}
            </Button>
          </List>
        </Paper>
      </Container>
    </div>
  );
}
