import { Meta } from "./meta";
export type Blog = {
  slug: string;
  title: string;
  description: string;
};

export type BlogResponse = {
  data: Blog[];
  meta: Meta;
};
