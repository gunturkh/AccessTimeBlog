"use client";
import { UserAccessResponse } from "@/types/user";

export const useSetToken = () => {
  const setToken = (user: UserAccessResponse | null) => {
    if (!user) {
      window.localStorage.removeItem("token");
      return;
    }
    window.localStorage.setItem("token", user.jwt);
  };

  return setToken;
};
