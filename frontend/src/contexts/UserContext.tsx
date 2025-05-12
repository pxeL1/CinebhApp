import { createContext } from "react";
import { User } from "models/User";

type UserContextValues = {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
}

export const UserContext = createContext<UserContextValues | null>(null);
