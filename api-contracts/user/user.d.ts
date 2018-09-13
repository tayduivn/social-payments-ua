export interface User {
  _id: string;
  login: string;
  fullName: string;
  isAdmin: boolean;
  password?: string;
}

