import { PropsWithChildren, useEffect, useState } from "react";
import { User } from "models/User";
import { isTimeBeforeNow } from "utility/time-utils";
import get from "services/fetching/Get";
import { getValidateRequest } from "services/fetching/API";
import { UserContext } from "./UserContext";

export default function UserContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const userString = localStorage.getItem("user");
    const expiration = localStorage.getItem("expiration");
    if (userString) {
      const user: User = JSON.parse(userString);
      setUser(user);
    }

    if (expiration && isTimeBeforeNow(expiration)) {
      get(getValidateRequest()).catch(() => {
        setUser(undefined);
        localStorage.removeItem("user");
        localStorage.removeItem("expiration");
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
