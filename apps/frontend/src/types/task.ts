import { Meta } from "./meta";
import { User } from "./user";

export type TaskInput = {
  text: string;
};

export type Task = {
  id: number;
  documentId: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  user: User;
};

export type TaskResponse = {
  data: Task[];
  meta: Meta;
};
