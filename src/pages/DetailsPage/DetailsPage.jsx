import { Container } from "@mui/material";
import { Paper } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect } from "react";

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
    <>
      <Container maxWidth="md" sx={{ mx: "auto" }}>
        <Paper elevation1 sx={{ p: 5 }}>
          <img src={story.urlToImage} style={{ maxWidth: "100%" }} />
          <h1>{story.title}</h1>
          {(savedStories && savedStories.includes(story)) || story.saved ? (
            <Button size="small" onClick={() => handleDelete(story._id)}>
              Unsave -
            </Button>
          ) : (
            <Button size="small" onClick={() => handleSave(story)}>
              Save +
            </Button>
          )}
          <h3>{story.description}</h3>
          <h3>{story.source.name}</h3>
          <p>{contentSplit()}</p>
          <a href={story.url} target="_blank">
            Read Full Article
          </a>
        </Paper>
      </Container>
    </>
  );
}
