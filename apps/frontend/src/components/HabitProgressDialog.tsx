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

interface HabitProgressDialogProps {
  open: DialogProps["open"];
  onClose?: () => void;
  onConfirm?: () => void;
}

export default function HabitProgressDialog({
  open,
  onClose,
}: HabitProgressDialogProps) {
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
          <CircularProgress value={30} variant={"determinate"} />
          {/* Row 2 */}
          <p>Times Habit Missed</p>
          <CircularProgress
            color={"error"}
            value={60}
            variant={"determinate"}
          />
          {/* Row 3 */}
          <p>Days Left</p>
          <CircularProgress value={90} variant={"determinate"} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
