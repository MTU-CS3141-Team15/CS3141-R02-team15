import {
  Button,
  Dialog,
  DialogActions,
  DialogProps,
  DialogTitle,
} from "@mui/material";

interface DeleteHabitDialogProps {
  open: DialogProps["open"];
  onClose?: () => void;
  onConfirm?: () => void;
}

export default function DeleteHabitDialog({
  open,
  onClose,
  onConfirm,
}: DeleteHabitDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Are you sure you want to delete this habit?"}
      </DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>Keep</Button>
        <Button color="error" onClick={onConfirm} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
