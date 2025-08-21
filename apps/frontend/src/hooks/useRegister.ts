"use client";
import { UserRegister } from "@/types/user";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
  const register = async (data: UserRegister) => {
    const response = await fetch("/api/register", {
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

  return useMutation({ mutationFn: register });
};
