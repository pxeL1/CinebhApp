import { UserRole } from "models/UserRole";

export type User = {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  city?: string;
  country?: string;
  roles: UserRole[];
};
