export type Author = {
  id: number;
  documentId: string;
  fullName: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: {
    id: number;
    documentId: string;
    url: string;
    alternativeText: string | null;
  };
};
