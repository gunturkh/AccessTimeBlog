"use client";
import { useQuery } from "@tanstack/react-query";
import { BlogBySlugResponse } from "@/types/blog";

export const useGetBlogBySlug = (slug: string) => {
  const fetchBlogBySlug = async () => {
    const response = await fetch(`/api/blogs/${slug}`, {
    });
    const data = (await response.json()) as BlogBySlugResponse;
    return data;
  };

  const query = useQuery({
    queryKey: ["blogs", slug],
    queryFn: () => fetchBlogBySlug(),
  });

  return query;
};
