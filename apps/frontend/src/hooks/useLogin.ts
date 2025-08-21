"use client";
import { UserLogin } from "@/types/user";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const login = async (data: UserLogin) => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.error) {
      throw new Error(result.error.message);
    }

    return result;
  };

  return useMutation({
    mutationFn: login,
  });
};
