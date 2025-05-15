import { createContext } from "react";
import { User } from "models/User";

type UserContextValues = {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
};

const user = undefined;
const setUser = (user: User | undefined) => {}

export const UserContext = createContext<UserContextValues>({user, setUser});
