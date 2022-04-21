import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Box,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Habit } from "../util/hooks/useHabits";
import APIRequest from "../util/request";

/* Function to calculat the difference between two dates */
function getDiffBetweenDates(date1: Date, date2: Date) {
  // Calculate the difference in time
  const time_diff = date1.getTime() - date2.getTime();

  // Calculate the day based on the time difference
  const day_diff = time_diff / (1000 * 3600 * 24);

  return day_diff;
}

interface HabitProgressDialogProps {
  open: DialogProps["open"];
  habit?: Habit;
  onClose?: () => void;
}

export default function HabitProgressDialog({
  open,
  habit,
  onClose,
}: HabitProgressDialogProps) {
  const [timesMet, setTimesMet] = useState(0);
  const [timesNotMet, setTimesNotMet] = useState(0);
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    if (habit) {
      APIRequest.get(`/habits/${habit.id}/statistics`)
        .then((res) => res.json())
        .then((body) => {
          setTimesMet((body.timesMet / body.entries) * 100);
          setTimesNotMet(((body.entries - body.timesMet) / body.entries) * 100);
          setDaysLeft(
            getDiffBetweenDates(
              new Date(body.endDate),
              new Date(body.startDate)
            )
          );
        });
    }
  }, [habit]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Your Progress"}</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            justifyContent: "center center",
            justifyText: "center center",
          }}
        >
          {/* Row 1 */}
          <p>Times Habit Met</p>
          <CircularProgress value={timesMet} variant={"determinate"} />
          {/* Row 2 */}
          <p>Times Habit Missed</p>
          <CircularProgress
            color={"error"}
            value={timesNotMet}
            variant={"determinate"}
          />
          {/* Row 3 */}
          <p>Days Left</p>
          <CircularProgress value={daysLeft} variant={"determinate"} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
