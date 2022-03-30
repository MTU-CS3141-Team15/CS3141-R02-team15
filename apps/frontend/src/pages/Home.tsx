import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
} from "@mui/material";
import * as React from "react";
import { CreateHabitCard, HabitCard } from "../components/habitCard";

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
      <CreateHabitCard handleClick={handleClickOpenCreate} />

      <HabitCard
        name="Habit 1"
        description="Description of habit"
        handleUpdate={undefined}
        handleProgress={undefined}
        handleDelete={handleClickOpenDelete}
      />

      <HabitCard
        name="Habit 2"
        description="Description of habit"
        handleUpdate={undefined}
        handleProgress={undefined}
        handleDelete={handleClickOpenDelete}
      />

      <HabitCard
        name="Habit 3"
        description="Description of habit"
        handleUpdate={undefined}
        handleProgress={undefined}
        handleDelete={handleClickOpenDelete}
      />

      <HabitCard
        name="Habit 4"
        description="Description of habit"
        handleUpdate={undefined}
        handleProgress={undefined}
        handleDelete={handleClickOpenDelete}
      />

      <HabitCard
        name="Habit 5"
        description="Description of habit"
        handleUpdate={undefined}
        handleProgress={undefined}
        handleDelete={handleClickOpenDelete}
      />

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
