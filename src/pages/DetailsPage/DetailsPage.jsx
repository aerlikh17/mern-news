import { Container, Typography, List, ListItem } from "@mui/material";
import { Paper } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function DetailsPage({
  story,
  savedStories,
  setSavedStories,
  handleSave,
  handleDelete,
  user,
}) {
  story.saved = false;
  story._id = "";
  savedStories.forEach(function (saved) {
    if (saved.url === story.url && user.id === saved.id) {
      story.saved = true;
      story._id = saved._id;
    }
  });

  return (
    <Box className="page-body">
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
          {story.source.name}
        </h1>
      </Paper>
      <Container maxWidth="md">
        <Paper maxWidth="md" elevation1 sx={{ p: 5 }}>
          <img
            src={story.urlToImage}
            style={{ maxWidth: "100%", borderRadius: "10px" }}
          />
          <List>
            <Typography variant="h4" margin="1rem" id="storyTitle">
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
              <Typography id="storyInfo" variant="h5">
                {story.description}
              </Typography>
            </ListItem>
            <Button href={story.url} target="_blank">
              Read Full Article at {story.source.name}
            </Button>
          </List>
        </Paper>
      </Container>
    </Box>
  );
}
