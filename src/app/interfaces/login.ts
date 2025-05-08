export interface Login {
  email: string;
  password: string;
}

export interface SignInResponse {
  status: number;
  message: string;
  token: string;
  user: User;
}

export interface SignUpResponse {
  message: string;
  status: number;
  userId: string;
}

export interface User {
  id: string;
  email: string;
}

export interface RenewPassword {
  id: string;
  password: string;
}

export interface RenewPasswordResponse {
  status: number;
  message: string;
  result: User;
}

export interface User {
  _id: string;
  email: string;
  password: string;
  active: boolean;
  createDate: Date;
}
