import { PropsWithChildren, useMemo, useState } from "react";
import { createSafeContext } from "../util/context";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

type UserContext = {
  user?: User;
  setUser: (user: User) => void;
};

const [useUserContext, Provider] = createSafeContext<UserContext>();

export { useUserContext };

export default function UserProvider({
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  const [user, setUser] = useState<User>();

  const context = useMemo<UserContext>(
    () => ({ user: user, setUser: setUser }),
    [user]
  );

  return <Provider value={context}>{children}</Provider>;
}
