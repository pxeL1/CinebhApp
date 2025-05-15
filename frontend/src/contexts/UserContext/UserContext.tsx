import { createContext } from "react";
import { User } from "models/User";

export type UserContextValues = {
  user?: User;
  setUser: (user?: User) => void;
};

const user = undefined;
const setUser = (user?: User) => {};

export const UserContext = createContext<UserContextValues>({ user, setUser });
