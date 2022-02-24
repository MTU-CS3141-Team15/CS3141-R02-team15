import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import ListItemLink, { ListItemLinkProps } from "./ListItemLink";

export default function ListItemNavLink({ to, ...props }: ListItemLinkProps) {
  const location = useLocation();

  const isActive = useMemo(
    () => location.pathname === to,
    [location.pathname, to]
  );

  return <ListItemLink selected={isActive} to={to} {...props}></ListItemLink>;
}
