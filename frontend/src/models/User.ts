import { UserRole } from "models/UserRole";

export type User = {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  city: string | null;
  country: string | null;
  roles: UserRole[];
};
