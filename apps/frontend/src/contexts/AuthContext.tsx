"use client";
import { createContext, useState } from "react";

export type AuthContextType = {
  userToken: string | null;
  setUserToken: (userToken: string | null) => void;
};

export const AuthContext = createContext<AuthContextType>({
  userToken: null,
  setUserToken: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const existingToken = window?.localStorage.getItem("token") ?? "";
  const [userToken, setUserToken] = useState<string | null>(
    existingToken || null
  );

  return (
    <AuthContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </AuthContext.Provider>
  );
};
