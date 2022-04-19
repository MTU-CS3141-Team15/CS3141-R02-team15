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
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { Route, Routes, Link as RouterLink } from "react-router-dom";
import { lightTheme } from "../themes/light";
import MenuIcon from "@mui/icons-material/Menu";
import { lazy, Suspense, useCallback, useState } from "react";
import ListItemNavLink from "./ListItemNavLink";
import UserProvider from "./UserProvider";
import UserButton from "./UserButton";
import * as React from "react";

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Account = lazy(() => import("../pages/Account"));

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = useCallback(
    () => setDrawerOpen(!drawerOpen),
    [drawerOpen]
  );

  //Modified codes VV
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = (s: string) => {
    setAnchorElUser(null);
  };
  const settings = ["Account", "Logout"];

  //Modifed Codes ^^

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
            {/* Modified vv */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <UserButton />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleCloseUserMenu(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
          {/* Modified ^ */}
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
          </Routes>
        </Suspense>
      </UserProvider>
    </ThemeProvider>
  );
}
