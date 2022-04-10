import { ThemeProvider } from "@emotion/react";
import {
  AppBar,
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
  Link,
} from "@mui/material";
import { Route, Routes, Link as RouterLink } from "react-router-dom";
import { lightTheme } from "../themes/light";
import MenuIcon from "@mui/icons-material/Menu";
import { lazy, Suspense, useCallback, useState } from "react";
import ListItemNavLink from "./ListItemNavLink";
import UserProvider from "./UserProvider";
import UserButton from "./UserButton";

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = useCallback(
    () => setDrawerOpen(!drawerOpen),
    [drawerOpen]
  );

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <UserProvider>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ marginRight: 2 }}
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link
                component={RouterLink}
                to="/"
                color="inherit"
                underline="none"
              >
                Habit Helper
              </Link>
            </Typography>
            <UserButton />
          </Toolbar>
        </AppBar>
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
          >
            <List>
              <ListItemNavLink to="/" primary="Home" />
            </List>
          </Box>
        </Drawer>
        <Suspense
          fallback={
            <Container
              component="main"
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <CircularProgress sx={{ marginTop: 15 }} />
            </Container>
          }
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Suspense>
      </UserProvider>
    </ThemeProvider>
  );
}
