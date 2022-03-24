import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import * as React from "react";

export default function Home() {
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  // TODO: Don't console log information in production!!!
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      habitName: data.get("habit-name"),
      habitDesc: data.get("habit-description"),
    });
  };

  return (
    <Box
      component="main"
      sx={{
        marginTop: 8,
        marginX: 8,
        display: "flex",
        flexDirection: "grid",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Card
        sx={{ maxWidth: 275, margin: 2, maxHeight: 130 }}
        onClick={handleClickOpenCreate}
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

      <Card sx={{ minWidth: 275, margin: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Habit 1
          </Typography>
          <Typography variant="body2">Description of habit.</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Update</Button>
          <Button size="small">Progress</Button>
          <Button size="small" color="error" onClick={handleClickOpenDelete}>
            Delete
          </Button>
        </CardActions>
      </Card>

      <Card sx={{ minWidth: 275, margin: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Habit 2
          </Typography>
          <Typography variant="body2">Description of habit.</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Update</Button>
          <Button size="small">Progress</Button>
          <Button size="small" color="error" onClick={handleClickOpenDelete}>
            Delete
          </Button>
        </CardActions>
      </Card>

      <Card sx={{ minWidth: 275, margin: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Habit 3
          </Typography>
          <Typography variant="body2">Description of habit.</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Update</Button>
          <Button size="small">Progress</Button>
          <Button size="small" color="error" onClick={handleClickOpenDelete}>
            Delete
          </Button>
        </CardActions>
      </Card>

      <Card sx={{ minWidth: 275, margin: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Habit 4
          </Typography>
          <Typography variant="body2">Description of habit.</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Update</Button>
          <Button size="small">Progress</Button>
          <Button size="small" color="error" onClick={handleClickOpenDelete}>
            Delete
          </Button>
        </CardActions>
      </Card>

      <Card sx={{ minWidth: 275, margin: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Habit 5
          </Typography>
          <Typography variant="body2">Description of habit.</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Update</Button>
          <Button size="small">Progress</Button>
          <Button size="small" color="error" onClick={handleClickOpenDelete}>
            Delete
          </Button>
        </CardActions>
      </Card>

      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this habit?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Keep</Button>
          <Button color="error" onClick={handleCloseDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openCreate} onClose={handleCloseCreate}>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <DialogTitle>Create a new habit</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter a name and description for the habit:
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="habit-name"
              name="habit-name"
              label="Habit Name"
              type="name"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="habit-description"
              name="habit-description"
              label="Habit Description"
              type="description"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCreate} color="error">
              Cancel
            </Button>
            <Button onClick={handleCloseCreate} type="submit">
              Create
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
