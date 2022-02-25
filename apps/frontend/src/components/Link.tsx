import { Link as MUILink, LinkProps } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

/**
 * A wrapper component allowing {@link RouterLink} to function as a {@link MUILink}
 */
export default function Link({
  children,
  ...props
}: LinkProps<typeof RouterLink>) {
  return (
    <MUILink component={RouterLink} {...props}>
      {children}
    </MUILink>
  );
}
