import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Box,
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
            justifyContent: "center",
          }}
        >
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
