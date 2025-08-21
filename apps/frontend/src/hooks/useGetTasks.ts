"use client";
import { useQuery } from "@tanstack/react-query";
import { useToken } from "./useToken";
import { TaskResponse } from "@/types/task";

export const useGetTasks = () => {
  const token = useToken();

  const fetchTasks = async () => {
    const response = await fetch("/api/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = (await response.json()) as TaskResponse;
    return data;
  };

  const query = useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchTasks(),
  });

  return query;
};
