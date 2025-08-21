"use client";
import { useQuery } from "@tanstack/react-query";
import { useToken } from "./useToken";
import { BlogResponse } from "@/types/blog";

export const useGetBlogs = () => {
  const token = useToken();

  const fetchBlogs = async () => {
    const response = await fetch("/api/blogs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = (await response.json()) as BlogResponse;
    return data;
  };

  const query = useQuery({
    queryKey: ["blogs"],
    queryFn: () => fetchBlogs(),
  });

  return query;
};
