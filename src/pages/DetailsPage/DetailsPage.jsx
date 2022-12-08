import { useEffect } from "react";

import { Container } from "@mui/material";
import { Paper } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export default function DetailsPage({
  story,
  savedStories,
  setSavedStories,
  handleSave,
  handleDelete,
  user,
}) {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
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
    </div>
  );
}
