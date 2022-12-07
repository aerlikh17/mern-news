import { Container } from "@mui/material";
import { Paper } from "@mui/material";
import { useEffect } from "react";

export default function DetailsPage({ story }) {
  function contentSplit() {
    let content = story.content.split("[+");
    return content[0];
  }

  return (
    <>
      <Container maxWidth="md" sx={{ mx: "auto" }}>
        <Paper elevation1 sx={{ p: 5 }}>
          <img src={story.urlToImage} style={{ maxWidth: "100%" }} />
          <h1>{story.title}</h1>
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
