import { createContext } from "react";

export type AuthSidebarContextValues = {
  openAuthSidebar: (closeHandler: () => void) => void;
};

const openAuthSidebar = (closeHandler: () => void) => {};

export const AuthSidebarContext = createContext<AuthSidebarContextValues>({
  openAuthSidebar,
});
