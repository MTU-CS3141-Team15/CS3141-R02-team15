import { Avatar, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { User, useUserContext } from "./UserProvider";
import { useMemo } from "react";

/**
 * Taken from https://mui.com/components/avatars/
 *
 * @param string string to be used for color generation
 * @returns color code
 */
function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

/**
 * Based on a function from https://mui.com/components/avatars/
 *
 * @param user User to be used to create an avatar string
 * @returns an avatar string for the given user
 */
function stringAvatar(user: User) {
  return {
    sx: {
      bgcolor: stringToColor(`${user.firstName}${user.lastName}`),
    },
    children: `${user.firstName[0]}${user.lastName[0]}`,
  };
}

export default function UserButton() {
  const { user } = useUserContext();

  const element = useMemo(() => {
    if (user) {
      return <Avatar {...stringAvatar(user)} />;
    } else {
      return (
        <Button color="inherit" component={RouterLink} to="/login">
          Login
        </Button>
      );
    }
  }, [user]);

  return element;
}
