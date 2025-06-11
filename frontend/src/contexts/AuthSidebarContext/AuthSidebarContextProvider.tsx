import { PropsWithChildren, useState } from "react";
import { AuthSidebarContext } from "contexts/AuthSidebarContext/AuthSidebarContext";
import AuthenticationSidebar from "components/AuthenticationSidebar/AuthenticationSidebar";

export default function AuthSidebarContextProvider({
  children,
}: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const [onLogin, setOnLogin] = useState<() => void>(() => {});

  function openAuthSidebar(closeHandler: () => void) {
    setIsOpen(true);
    setOnLogin(closeHandler);
  }

  return (
    <AuthSidebarContext.Provider value={{ openAuthSidebar }}>
      <AuthenticationSidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onLogin={onLogin}
      />
      {children}
    </AuthSidebarContext.Provider>
  );
}
