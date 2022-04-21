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
import { lazy, Suspense, useCallback, useMemo, useState } from "react";
import ListItemNavLink from "./ListItemNavLink";
import UserProvider from "./UserProvider";
import UserButton from "./UserButton";
import FlashlightOffIcon from "@mui/icons-material/FlashlightOff";
import FlashlightOnIcon from "@mui/icons-material/FlashlightOn";
import { darkTheme } from "../themes/dark";

const Landing = lazy(() => import("../pages/Landing"));
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Account = lazy(() => import("../pages/Account"));

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dark, setDark] = useState(true);

  const theme = useMemo(() => (dark ? darkTheme : lightTheme), [dark]);
  const themeIcon = useMemo(
    () => (dark ? <FlashlightOffIcon /> : <FlashlightOnIcon />),
    [dark]
  );

  const toggleDarkMode = useCallback(() => setDark(!dark), [dark]);

  const toggleDrawer = useCallback(
    () => setDrawerOpen(!drawerOpen),
    [drawerOpen]
  );
  return (
    <ThemeProvider theme={theme}>
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
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="Dark Mode"
              sx={{ marginRight: 2 }}
              onClick={toggleDarkMode}
            >
              {themeIcon}
            </IconButton>
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
              <ListItemNavLink to="/account" primary="Account" />
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
            <Route path="/account" element={<Account />} />
            <Route path="/welcome" element={<Landing />} />
          </Routes>
        </Suspense>
      </UserProvider>
    </ThemeProvider>
  );
}
