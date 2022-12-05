import * as React from 'react';
import './StoryCard.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function StoryCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      />
      <CardActions>
        <Button size="small">(source/publication)</Button>
        <Button size="small">Save +</Button>
      </CardActions>
      <CardContent>
        <Typography align="left" gutterBottom variant="h5" component="div">
          News Story
        </Typography>
      </CardContent>
    </Card>
  );
}