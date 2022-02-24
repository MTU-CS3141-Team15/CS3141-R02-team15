import { Link as MUILink, LinkProps } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

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
