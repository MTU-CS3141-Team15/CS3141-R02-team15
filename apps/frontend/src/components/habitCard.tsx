import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import React, { Component } from "react";

interface cardData {
  name: string;
  description?: string;
  handleUpdate: React.MouseEventHandler<HTMLButtonElement> | undefined;
  handleProgress: React.MouseEventHandler<HTMLButtonElement> | undefined;
  handleDelete: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

interface createCardData {
  handleClick: React.MouseEventHandler<HTMLDivElement> | undefined;
}

export class CreateHabitCard extends Component<createCardData> {
  render() {
    const { handleClick } = this.props;
    return (
      <Card
        sx={{ maxWidth: 275, margin: 2, maxHeight: 130 }}
        onClick={handleClick}
      >
        <CardActionArea>
          <CardContent>
            <Typography variant="h5" component="div">
              New Habit
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            height="65"
            image="https://lh3.googleusercontent.com/WyK_38n4GGPtqitT0IP7dVq8n9edWFdL__DAJfaxMNEmqtdyJv9WKfAEjuArMO8lt6WOyzwRYCO-xKId8CBW6qr4O3JdczTIo4v3FOH7c-q_VZXDbGM=w1064-v0"
            alt="create-habit"
          />
        </CardActionArea>
      </Card>
    );
  }
}

export class HabitCard extends Component<cardData> {
  render() {
    const { name, description, handleDelete, handleUpdate, handleProgress } =
      this.props;
    return (
      <Card sx={{ minWidth: 275, margin: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleUpdate}>
            Update
          </Button>
          <Button size="small" onClick={handleProgress}>
            Progress
          </Button>
          <Button size="small" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </CardActions>
      </Card>
    );
  }
}
