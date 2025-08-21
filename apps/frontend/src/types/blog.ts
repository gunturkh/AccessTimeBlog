import { Author } from "./author";
import { FeaturedImage } from "./image";
import { Meta } from "./meta";

export type Blog = {
  author: Author;
  content: string;
  createdAt: string;
  description: string;
  documentId: string;
  featuredImage: FeaturedImage;
  id: number;
  publishedAt: string;
  slug: string;
  title: string;
  updatedAt: string;
};

export type BlogResponse = {
  data: Blog[];
  meta: Meta;
};

export type BlogBySlugResponse = {
  data: Blog | null;
  meta: Meta;
};
