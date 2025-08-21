"use client";
import { TaskInput } from "@/types/task";
import { useToken } from "./useToken";
import { useMutation } from "@tanstack/react-query";

export const usePostTask = () => {
  const token = useToken();

  const postTask = async (task: TaskInput) => {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });
    const result = await response.json();
    if (result.error) {
      throw new Error(result.error);
    }
    return result;
  };

  return useMutation({
    mutationFn: postTask,
  });
};
