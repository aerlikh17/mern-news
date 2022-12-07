import * as React from "react";
import { Link } from "react-router-dom";
import "./StoryCard.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";

export default function StoryCard({
  story,
  savedStories,
  setSavedStories,
  handleDelete,
  setCurrentStory,
}) {
  async function handleSave() {
    const token = localStorage.getItem("token");
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    console.log(savedStories);
    axios
      .post("/api/news/saveStory", story, {
        headers: headers,
      })
      .then((result) => {
        setSavedStories([...savedStories, result.data]);
      });
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={story.urlToImage}
        alt="news story image"
      />
      <CardActions>
        <a href={story.url}>
          <Button size="small">{story.source.name}</Button>
        </a>
        {(savedStories && savedStories.includes(story)) || story.saved ? (
          <Button size="small" onClick={() => handleDelete(story._id)}>
            Unsave -
          </Button>
        ) : (
          <Button size="small" onClick={handleSave}>
            Save +
          </Button>
        )}
      </CardActions>
      <CardContent>
        <Link
          to={{ pathname: "/stories/detail", state: { story: { story } } }}
          onClick={() => setCurrentStory(story)}
        >
          <Typography align="left" gutterBottom variant="h5" component="div">
            <a>{story.title}</a>
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
}
