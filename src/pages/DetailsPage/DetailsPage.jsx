import { Container } from "@mui/material";
import { Paper } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";

export default function DetailsPage({ story }) {
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

  return (
    <div className="page-body">
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
    </div>
  );
}
