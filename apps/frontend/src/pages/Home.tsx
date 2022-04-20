import { Stack, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HabitCard from "../components/HabitCard";
import { useCallback, useEffect, useMemo, useState } from "react";
import useHabits, { Habit } from "../util/hooks/useHabits";
import CreateHabitDialog, { HabitForm } from "../components/CreateHabitDialog";
import APIRequest from "../util/request";
import DeleteHabitDialog from "../components/DeleteHabitDialog";
import { useUserContext } from "../components/UserProvider";
import { useNavigate } from "react-router-dom";
import HabitProgressDialog from "../components/HabitProgressDialog";
import ProgressHabitDialog from "../components/ProgressHabitDialog";

export default function Home() {
  // Simple fix to redirect unauthenticated users to the welcome landing page
  const navigate = useNavigate();
  const { user } = useUserContext();
  if (!user) navigate("/welcome");

  const [openDelete, setOpenDelete] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<Habit>();
  const [openCreate, setOpenCreate] = useState(false);
  const [habits, addHabits, deleteHabits] = useHabits([]);
  //Progress consts VVV
  const [habitToProgress, setHabitToProgress] = useState<Habit>();
  const [openProgress, setOpenProgress] = useState(false);

  const handleDeleteClose = useCallback(() => {
    setSelectedHabit(undefined);
    setOpenDelete(false);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (selectedHabit) {
      deleteHabits(selectedHabit);
      setSelectedHabit(undefined);
    }
    setOpenDelete(false);
  }, [deleteHabits, selectedHabit]);

  const handleProgressConfirm = useCallback(() => {
    if (habitToProgress) {
      setHabitToProgress(undefined);
      setOpenProgress(false);
    }
  }, []);
  //Progress ^^
  const handleCreateOpen = useCallback(() => {
    setOpenCreate(true);
  }, []);

  const handleCreateClose = useCallback(() => {
    setOpenCreate(false);
  }, []);

  const handleProgressClose = useCallback(() => {
    setOpenProgress(false);
    setSelectedHabit(undefined);
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
          setSelectedHabit(habit);
          setOpenDelete(true);
        };
        const handleProgress = () => {
          setSelectedHabit(habit);
          setOpenProgress(true);
        };
        return (
          <HabitCard
            key={habit.id}
            name={habit.name}
            description={habit.description}
            onUpdate={undefined}
            onProgress={handleProgress}
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
      <ProgressHabitDialog
        open={openProgress}
        onClose={handleProgressClose}
        onConfirm={handleProgressConfirm}
      />
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
      <HabitProgressDialog
        habit={selectedHabit}
        open={openProgress}
        onClose={handleProgressClose}
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
