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
  handleSave,
  handleDelete,
  setCurrentStory,
}) {
  return (
    <Card sx={{ maxWidth: "100%", maxHeight: "100%" }}>
      <Link
        to={{ pathname: "/stories/detail", state: { story: { story } } }}
        onClick={() => setCurrentStory(story)}
      >
        <CardMedia
          component="img"
          maxHeight="100%"
          image={story.urlToImage ? story.urlToImage : "/newsbyte_imageURL.png"}
          alt="news story image"
        />
      </Link>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button size="small" href={story.url}>
          {story.source.name ? story.source.name : story.source}
        </Button>

        {(savedStories && savedStories.includes(story)) || story.saved ? (
          <Button size="small" onClick={() => handleDelete(story._id)}>
            Unsave -
          </Button>
        ) : (
          <Button size="small" onClick={() => handleSave(story)}>
            Save +
          </Button>
        )}
      </CardActions>
      <CardContent>
        <Link
          to={{ pathname: "/stories/detail", state: { story: { story } } }}
          onClick={() => setCurrentStory(story)}
        >
          <Typography align="center" gutterBottom variant="h5" component="div">
            {story.title}
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
}
