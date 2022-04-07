import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useCallback, useMemo, useState } from "react";

export type HabitForm = {
  name: string;
  description: string;
  endDate: Date | null;
};

interface CreateHabitDialogProps {
  open: DialogProps["open"];
  onClose?: () => void;
  onSubmit?: (habit: HabitForm) => void;
}

export default function CreateHabitDialog({
  open,
  onClose,
  onSubmit,
}: CreateHabitDialogProps) {
  const [formData, setFormData] = useState<HabitForm>({
    name: "",
    description: "",
    endDate: null,
  });

  const handleSubmit = useMemo(() => {
    if (onSubmit) {
      return (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(formData);
      };
    }
    return undefined;
  }, [formData, onSubmit]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      }),
    [formData]
  );

  const handleDateChange = useCallback(
    (date: Date | null) => {
      if (date) {
        setFormData({
          ...formData,
          endDate: date,
        });
      }
    },
    [formData]
  );

  const renderDateTextField = useCallback(
    (params: TextFieldProps) => (
      <TextField
        required
        margin="dense"
        fullWidth
        variant="standard"
        {...params}
      />
    ),
    []
  );

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create a new habit</DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="habit-name"
            name="name"
            label="Habit Name"
            type="text"
            fullWidth
            variant="standard"
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="habit-description"
            name="description"
            label="Habit Description"
            type="text"
            fullWidth
            variant="standard"
            value={formData.description}
            onChange={handleInputChange}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="End Date"
              value={formData.endDate}
              onChange={handleDateChange}
              renderInput={renderDateTextField}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
