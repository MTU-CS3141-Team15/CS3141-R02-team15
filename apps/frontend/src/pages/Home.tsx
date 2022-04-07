import { Stack, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HabitCard from "../components/HabitCard";
import { useCallback, useEffect, useMemo, useState } from "react";
import useHabits, { Habit } from "../util/hooks/useHabits";
import CreateHabitDialog, { HabitForm } from "../components/CreateHabitDialog";
import APIRequest from "../util/request";
import DeleteHabitDialog from "../components/DeleteHabitDialog";

export default function Home() {
  const [openDelete, setOpenDelete] = useState(false);
  const [habitToDelete, setHabitToDelete] = useState<Habit>();
  const [openCreate, setOpenCreate] = useState(false);
  const [habits, addHabits, deleteHabits] = useHabits([]);

  const handleDeleteClose = useCallback(() => {
    setHabitToDelete(undefined);
    setOpenDelete(false);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (habitToDelete) {
      deleteHabits(habitToDelete);
      setHabitToDelete(undefined);
    }
    setOpenDelete(false);
  }, [deleteHabits, habitToDelete]);

  const handleCreateOpen = useCallback(() => {
    setOpenCreate(true);
  }, []);

  const handleCreateClose = useCallback(() => {
    setOpenCreate(false);
  }, []);

  const handleCreateSubmit = useCallback(
    (habit: HabitForm) => {
      APIRequest.post("/habits", habit)
        .then((res) => res.json())
        .then((body) => addHabits(body))
        .then(() => setOpenCreate(false));
    },
    [addHabits]
  );

  useEffect(() => {
    APIRequest.get("/habits")
      .then((res) => res.json())
      .then((body) => addHabits(...body));
  }, [addHabits]);

  const habitCards = useMemo(
    () =>
      habits.map((habit) => {
        const handleDelete = () => {
          setHabitToDelete(habit);
          setOpenDelete(true);
        };
        return (
          <HabitCard
            key={habit.id}
            name={habit.name}
            description={habit.description}
            onUpdate={undefined}
            onProgress={undefined}
            onDelete={handleDelete}
          />
        );
      }),
    [habits]
  );

  return (
    <main>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 2, sm: 2, md: 4 }}
        sx={{ margin: 5 }}
        alignItems="center"
      >
        {habitCards}
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            display: { sm: "flex", xs: "none" },
          }}
          onClick={handleCreateOpen}
        >
          <AddIcon />
        </Fab>
      </Stack>
      <DeleteHabitDialog
        open={openDelete}
        onClose={handleDeleteClose}
        onConfirm={handleDeleteConfirm}
      />
      <CreateHabitDialog
        open={openCreate}
        onClose={handleCreateClose}
        onSubmit={handleCreateSubmit}
      />
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          display: { sm: "none", xs: "flex" },
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
        onClick={handleCreateOpen}
      >
        <AddIcon />
      </Fab>
    </main>
  );
}
