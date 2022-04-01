import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
  Stack,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HabitCard from "../components/HabitCard";
import { useState } from "react";

export default function Home() {
  const [openDelete, setOpenDelete] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

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
    <main>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 2, sm: 2, md: 4 }}
        sx={{ margin: 5, verticalAlign: "baseline" }}
      >
        <HabitCard
          name="Habit 1"
          description="Description of habit"
          onUpdate={undefined}
          onProgress={undefined}
          onDelete={handleClickOpenDelete}
        />

        <HabitCard
          name="Habit 2"
          description="Description of habit"
          onUpdate={undefined}
          onProgress={undefined}
          onDelete={handleClickOpenDelete}
        />

        <HabitCard
          name="Habit 3"
          description="Description of habit"
          onUpdate={undefined}
          onProgress={undefined}
          onDelete={handleClickOpenDelete}
        />

        <HabitCard
          name="Habit 4"
          description="Description of habit"
          onUpdate={undefined}
          onProgress={undefined}
          onDelete={handleClickOpenDelete}
        />

        <HabitCard
          name="Habit 5"
          description="Description of habit"
          onUpdate={undefined}
          onProgress={undefined}
          onDelete={handleClickOpenDelete}
        />
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            display: { sm: "flex", xs: "none" },
          }}
        >
          <AddIcon />
        </Fab>
      </Stack>
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
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          display: { sm: "none", xs: "flex" },
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
      >
        <AddIcon />
      </Fab>
    </main>
  );
}
