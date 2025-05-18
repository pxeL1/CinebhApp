export type PersonnelRole = "CAST" | "WRITER" | "DIRECTOR";

export type Personnel = {
  id: number;
  name: string;
  actorRoleName?: string;
  role: PersonnelRole;
}
