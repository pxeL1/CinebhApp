import { User } from "models/User";

export type AuthResponse = {
  user: User;
  expiration: string;
};
