import { Stack, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HabitCard from "../components/HabitCard";
import { useCallback, useEffect, useMemo, useState } from "react";
import useHabits, { Habit } from "../util/hooks/useHabits";
import CreateHabitDialog, { HabitForm } from "../components/CreateHabitDialog";
import APIRequest from "../util/request";
import DeleteHabitDialog from "../components/DeleteHabitDialog";
<<<<<<< HEAD
import { useUserContext } from "../components/UserProvider";
import { useNavigate } from "react-router-dom";
import HabitProgressDialog from "../components/HabitProgressDialog";
import ProgressHabitDialog from "../components/ProgressHabitDialog";
=======
import LogHabitDialog from "../components/LogHabitDialog";
>>>>>>> 5027642 (Refactored the progresshabit to loghabit.)

export default function Home() {
  // Simple fix to redirect unauthenticated users to the welcome landing page
  const navigate = useNavigate();
  const { user } = useUserContext();
  if (!user) navigate("/welcome");

  const [openDelete, setOpenDelete] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<Habit>();
  const [openCreate, setOpenCreate] = useState(false);
  const [habits, addHabits, deleteHabits] = useHabits([]);
  const [habitToLog, setHabitToLog] = useState<Habit>();
  const [openLog, setOpenLog] = useState(false);

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
<<<<<<< HEAD
  }, [deleteHabits, selectedHabit]);
=======
  }, [deleteHabits, habitToDelete]);

  const handleLogClose = useCallback(() => {
    setHabitToLog(undefined);
    setOpenLog(false);
  }, []);
>>>>>>> 5027642 (Refactored the progresshabit to loghabit.)

  const handleLogConfirm = useCallback(() => {
    if (habitToLog) {
      setHabitToLog(undefined);
      setOpenLog(false);
    }
  }, [habitToLog]);

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
<<<<<<< HEAD
        const handleProgress = () => {
          setSelectedHabit(habit);
          setOpenProgress(true);
=======
        const handleLog = () => {
          setHabitToLog(habit);
          setOpenLog(true);
>>>>>>> 5027642 (Refactored the progresshabit to loghabit.)
        };
        return (
          <HabitCard
            key={habit.id}
            name={habit.name}
            description={habit.description}
            onUpdate={handleLog}
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
      <LogHabitDialog
        open={openLog}
        onClose={handleLogClose}
        onConfirm={handleLogConfirm}
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
