"use client";
import { useQuery } from "@tanstack/react-query";
import { BlogBySlugResponse } from "@/types/blog";

export const useGetBlogBySlug = (slug: string) => {
  const fetchBlogBySlug = async () => {
    const response = await fetch(`/api/blogs/${slug}`, {
    });
    console.log("🚀 ~ fetchBlogBySlug ~ response:", response)
    const data = (await response.json()) as BlogBySlugResponse;
    console.log("🚀 ~ fetchBlogBySlug ~ data:", data)
    return data.data?.[0];
  };

  const query = useQuery({
    queryKey: ["blogs", slug],
    queryFn: () => fetchBlogBySlug(),
  });

  return query;
};
