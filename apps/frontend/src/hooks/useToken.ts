"use client";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export const useToken = () => {
  const { userToken } = useContext(AuthContext);
  return userToken;
};
