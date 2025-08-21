"use client";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import { UserAccessResponse } from "@/types/user";

export const useSetToken = () => {
  const { setUserToken } = useContext(AuthContext);

  const setToken = (user: UserAccessResponse | null) => {
    if (!user) {
      window.localStorage.removeItem("token");
      setUserToken(null);
      return;
    }
    window.localStorage.setItem("token", user.jwt);
    setUserToken(user.jwt);
  };

  return setToken;
};
