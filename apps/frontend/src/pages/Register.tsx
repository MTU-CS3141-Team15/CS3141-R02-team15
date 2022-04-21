import {
  Avatar,
  Button,
  Typography,
  Link,
  Grid,
  Box,
  Container,
  TextField,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import APIRequest from "../util/request";
import { useUserContext } from "../components/UserProvider";

type RegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function Register() {
  const navigate = useNavigate();
  const { setUser } = useUserContext();
  const [formData, setFormData] = useState<RegisterForm>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [passwordDiff, setPasswordDiff] = useState(false);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      APIRequest.post("/user/register", formData)
        .then((res) => {
          if (res.status !== 200) {
            throw new Error(`Error: ${res.status}`);
          }
          return APIRequest.post("/user/login", {
            email: formData["email"],
            password: formData["password"],
          });
        })
        .then((res) => res.json())
        .then((body) => {
          setUser({
            id: body["id"],
            email: body["email"],
            firstName: body["firstName"],
            lastName: body["lastName"],
          });
          navigate("/");
        })
        .catch((err) => console.log(err));
    },
    [formData, navigate, setUser]
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      }),
    [formData]
  );

  const checkPasswordMatch = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
      setPasswordDiff(formData.password !== event.target.value),
    [formData.password]
  );

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="firstName"
            autoFocus
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            error={passwordDiff}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            error={passwordDiff}
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="confirm-password"
            onChange={checkPasswordMatch}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Grid container>
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                {"Already have an account? Login"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
