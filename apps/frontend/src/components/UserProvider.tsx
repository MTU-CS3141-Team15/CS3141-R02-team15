import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { createSafeContext } from "../util/context";
import APIRequest from "../util/request";

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

  useEffect(() => {
    const cachedUser = localStorage.getItem("userInfo");
    if (cachedUser) {
      setUser(JSON.parse(cachedUser));
    }

    APIRequest.get("/user")
      .then((res) => res.json())
      .then((body) => {
        setUser(body);
        localStorage.setItem("userInfo", JSON.stringify(body));
      })
      .catch((error) => console.log(error));
  }, []);

  const context = useMemo<UserContext>(
    () => ({ user: user, setUser: setUser }),
    [user]
  );

  return <Provider value={context}>{children}</Provider>;
}
