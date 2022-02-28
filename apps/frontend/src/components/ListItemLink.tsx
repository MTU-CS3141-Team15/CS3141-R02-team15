import {
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { forwardRef, useMemo } from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

export interface ListItemLinkProps
  extends ListItemButtonProps<typeof RouterLink> {
  icon?: React.ReactElement;
  primary: string;
}

/**
 * A wrapper component allowing a {@link RouterLink} to function as a {@link ListItemButton}
 */
export default function ListItemLink({
  icon,
  primary,
  to,
  ...props
}: ListItemLinkProps) {
  const Link = useMemo(
    () =>
      forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, "to">>(function Link(
        itemProps,
        ref
      ) {
        return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
      }),
    [to]
  );

  return (
    <ListItemButton component={Link} {...props}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
    </ListItemButton>
  );
}
