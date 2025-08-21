export type UserLogin = {
  identifier: string;
  password: string;
};

export type UserRegister = {
  email: string;
  username: string;
  password: string;
  passwordConfirmation: string;
};

export type User = {
  id: string;
  documentId: string;
  blocked: boolean;
  confirmed: boolean;
  email: string;
  provider: string;
  username: string;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
};

export type UserAccessResponse = {
  jwt: string;
  user: User;
};
