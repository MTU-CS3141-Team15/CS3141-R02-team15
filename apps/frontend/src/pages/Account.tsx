import {
  Avatar,
  Button,
  Typography,
  Box,
  Container,
  Stack,
  Paper,
} from "@mui/material";
import * as React from "react";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import TextField from "@mui/material/TextField";

export default function Account() {
  const [openDelete, setOpenDelete] = React.useState(false);

  const handleDeleteOpen = () => {
    setOpenDelete(true);
  };

  const handleDeleteConfirm = () => {
    setOpenDelete(false);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "20",
        }}
      >
        <Typography component="h1" variant="h3">
          Account
        </Typography>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
      </Box>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          spacing: "2",
        }}
      >
        <Stack spacing={2} flexDirection="column">
          <Typography>Username</Typography>
          <Item>John Doe</Item>
          <Typography>Password</Typography>
          <Item>*********</Item>
          <Typography>Email</Typography>
          <Item>bar@example.com</Item>
        </Stack>
        <Button variant="text">
          <EditIcon /> Edit User Info
        </Button>
      </Box>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button variant="text">Give Us Feedback</Button>
        <Button variant="contained" onClick={handleDeleteOpen}>
          Delete My Account
        </Button>
        <Dialog open={openDelete} onClose={handleDeleteConfirm}>
          <DialogTitle>Is this goodbye?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you don't want to reconsider? What made you part way?
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="reason"
              type="delete"
              fullWidth
              variant="standard"
            />
            <DialogContentText variant="subtitle1" component="h1" color="black">
              Before upi delete, know this:
            </DialogContentText>
            <DialogContentText variant="subtitle2">
              If you want to change your username, you can navigate to edit
              info.
            </DialogContentText>
            <DialogContentText variant="subtitle2">
              Account deletion is final. There will be no way to restore your
              account.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteConfirm}>Delete my account</Button>
            <Button onClick={handleDeleteConfirm}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}
